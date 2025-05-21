"use server";

import { prisma } from "@dalim/db";
import mail from "../../../mail";
import { findUserByEmail } from "../../../validations/auth";
import { findVerificationTokenByToken } from "../../../services";
import type { User } from "@prisma/client"; 
/**
 * This method uses Resend to send an email to the user to verify
 * the ownership of the email by the user.
 *
 * @param {User} user - The user to send the verification email to.
 * @param {string} token - The verification token.
 * @returns {Promise<{ error?: string, success?: string }>} An object indicating the result of the operation.
 */
export const sendAccountVerificationEmail = async (
  user: User,
  token: string
) => {
  const {
    RESEND_EMAIL_FROM,
    VERIFICATION_SUBJECT,
    DALIM_URL,
    VERIFICATION_URL,
  } = process.env;
  if (
    !RESEND_EMAIL_FROM ||
    !VERIFICATION_SUBJECT ||
    !DALIM_URL ||
    !VERIFICATION_URL
  ) {
    return {
      error: "Congratulation e-mail.",
    };
  }

  const verificationUrl = `${DALIM_URL}${VERIFICATION_URL}?token=${token}`;
  const { email } = user;
  try {
  if (!email) return { error: "Email is required." };

  await mail.emails.send({
    from: RESEND_EMAIL_FROM,
    to: email,
    subject: VERIFICATION_SUBJECT,
    html: `<p>Clique <a href="${verificationUrl}">aqui</a> para confirmar seu e-mail.</p>`,
  });

  return {
    success: "E-mail enviado com sucesso",
  };
} catch (error) {
  return { error };
}


};

/**
 * This method updates the user's record with the date the email was verified.
 *
 * @param {string} token - The verification token.
 * @returns {Promise<{ error?: string, success?: string }>} An object indicating the result of the operation.
 */
export const verifyToken = async (token: string) => {
  const existingToken = await findVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Código de verificação não encontrado",
    };
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();
  if (isTokenExpired) {
    return {
      error: "Código de verificação expirado",
    };
  }

  const user = await findUserByEmail(existingToken.email);
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "E-mail verificado",
    };
  } catch (err) {
    return { error: "Erro ao atualizar verificação de e-mail" };
  }
};