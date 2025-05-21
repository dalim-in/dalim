"use server";

import { prisma } from "@dalim/db";
import mail from "../../../mail";
import { findUserByEmail } from "../../../validations/auth";
import { findTwoFactorAuthTokeByToken } from "../../../services";
import type { User } from "@prisma/client";

/**
 * This method sends an e-mail to the user with the 6 digits code to login
 * when Two Factor Authentication is enabled
 * @param {User} user
 * @param {string} token
 * @returns
 */
/**
 * This method sends an e-mail to the user with the 6 digits code to login
 * when Two Factor Authentication is enabled
 * @param {User} user - The user to send the verification email to.
 * @param {string} token - The verification token.
 * @returns {Promise<{ error?: string, success?: string }>} An object indicating the result of the operation.
 */
export const sendTwoFactorAuthEmail = async (user: User, token: string) => {
  const { RESEND_EMAIL_FROM, OTP_SUBJECT } = process.env;

  if (!RESEND_EMAIL_FROM || !OTP_SUBJECT) {
    return {
      error: "Configuração de ambiente insuficiente para envio de e-mail.",
    };
  }

  const { email } = user;

  if (!email) {
    return {
      error: "O e-mail do usuário está ausente.",
    };
  }

  try {
    await mail.emails.send({
      from: RESEND_EMAIL_FROM,
      to: email,
      subject: OTP_SUBJECT,
      html: `<p>Seu código OTP: <strong>${token}</strong></p>`,
    });

    return {
      success: "E-mail enviado com sucesso.",
    };
  } catch (error) {
    return {
      error: "Erro ao enviar o e-mail. Verifique as configurações do serviço.",
    };
  }
};


/**
 * This method updates the user's record with the date and time the
 * Two Factor Authentication was verified
 * @param token
 * @returns
 */
export const verifyTwoFactorToken = async (token: string) => {
  const existingToken = await findTwoFactorAuthTokeByToken(token);
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
        twoFactorAuthVerified: new Date(),
      },
    });

    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Autênticação de dois fatores verificada",
    };
  } catch (err) {
    return {
      error: "Erro ao verificar o  código de autenticação de 2 fatores",
    };
  }
};
