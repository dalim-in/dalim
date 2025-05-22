"use server";

import { prisma } from "@dalim/db";
import mail from "../../../mail";
import { findUserByEmail } from "../../../validations/auth";
import { findTwoFactorAuthTokeByToken } from "../../../services";
import type { User } from "@prisma/client";

/**
 * Sends a two-factor authentication (2FA) email containing a 6-digit OTP code to the user.
 * 
 * @param {User} user - The user to whom the email will be sent.
 * @param {string} token - The OTP code for 2FA.
 * @returns {Promise<{ error?: string, success?: string }>} The result of the email operation.
 */
export const sendTwoFactorAuthEmail = async (user: User, token: string) => {
  const { RESEND_EMAIL_FROM, OTP_SUBJECT } = process.env;

  if (!RESEND_EMAIL_FROM || !OTP_SUBJECT) {
    return {
      error: "Environment configuration is missing for sending emails.",
    };
  }

  const { email } = user;

  if (!email) {
    return {
      error: "User email is missing.",
    };
  }

  try {
    await mail.emails.send({
      from: RESEND_EMAIL_FROM,
      to: email,
      subject: OTP_SUBJECT,
      html: `<p>Your 2FA code: <strong>${token}</strong></p>`,
    });

    return {
      success: "Two-factor authentication email sent successfully.",
    };
  } catch (error) {
    return {
      error: "Failed to send email. Please check your email service configuration.",
    };
  }
};

/**
 * Verifies a two-factor authentication (2FA) token and updates the user's record accordingly.
 * 
 * @param {string} token - The OTP token to verify.
 * @returns {Promise<{ error?: string, success?: string }>} The result of the verification process.
 */
export const verifyTwoFactorToken = async (token: string) => {
  const existingToken = await findTwoFactorAuthTokeByToken(token);
  if (!existingToken) {
    return {
      error: "Verification code not found.",
    };
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();
  if (isTokenExpired) {
    return {
      error: "Verification code has expired.",
    };
  }

  const user = await findUserByEmail(existingToken.email);
  if (!user) {
    return {
      error: "User not found.",
    };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorAuthVerified: new Date(),
      },
    });

    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Two-factor authentication verified successfully.",
    };
  } catch (err) {
    return {
      error: "Error verifying the two-factor authentication code.",
    };
  }
};
