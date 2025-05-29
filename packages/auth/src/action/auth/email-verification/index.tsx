'use server'

import { prisma } from '@dalim/db'
import mail from '../../../mail'
import { findUserByEmail } from '../../../validations/auth'
import { findVerificationTokenByToken } from '../../../services'
import type { User } from '@prisma/client'
import EmailVerification from '../../../mail/email-verification'
import { render } from '@react-email/components'

/**
 * Sends a verification email to the user using Resend.
 *
 * @param {User} user - The user to send the verification email to.
 * @param {string} token - The verification token.
 * @returns {Promise<{ error?: string; success?: string }>} An object indicating the result of the operation.
 */
export const sendAccountVerificationEmail = async (user: User, token: string) => {
    const { RESEND_EMAIL_FROM,  DALIM_URL } = process.env

    if (!RESEND_EMAIL_FROM || !DALIM_URL) {
        return {
            error: 'Missing email configuration.',
        }
    }

    const verificationUrl = `${DALIM_URL}/verify-email?token=${token}`
    const { email } = user

    try {
        if (!email) return { error: 'User email is required.' }

        const html = await render(
            <EmailVerification
               username={user.name ?? user.email ?? undefined}
                verificationLink={verificationUrl}
            />
        )

        await mail.emails.send({
            from: RESEND_EMAIL_FROM,
            to: email,
            subject: "Email Verified",
            html, // ✅ now it's a plain string
        })

        return {
            success: 'Verification email sent successfully.',
        }
    } catch (error) {
        return { error: 'Failed to send verification email.' }
    }
}

/**
 * Verifies a user's email address using the provided token.
 *
 * @param {string} token - The verification token.
 * @returns {Promise<{ error?: string; success?: string }>} An object indicating the result of the operation.
 */
export const verifyToken = async (token: string) => {
    const existingToken = await findVerificationTokenByToken(token)

    if (!existingToken) {
        return {
            error: 'Verification code not found.',
        }
    }

    const isTokenExpired = new Date(existingToken.expires) < new Date()
    if (isTokenExpired) {
        return {
            error: 'Verification code has expired.',
        }
    }

    const user = await findUserByEmail(existingToken.email)
    if (!user) {
        return {
            error: 'User not found.',
        }
    }

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: new Date(),
            },
        })

        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        })

        return {
            success: 'Email successfully verified.',
        }
    } catch (err) {
        return { error: 'Failed to update email verification status.' }
    }
}
