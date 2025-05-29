"use server";

import mail from "../../../mail";
import { NewPasswordSchema, ResetPasswordSchema } from "../../../schemas/auth";
import { findUserByEmail } from "../../../validations/auth";
import {
  createResetPasswordToken,
  deleteResetPasswordToken,
  findResetPasswordTokenByToken,
  updatePassword,
} from "../../../services";
import bcryptjs from "bcryptjs";
import type { z } from "zod";

/**
 * This method initiates the reset password process
 * @param {z.infer<typeof ResetPasswordSchema>} values - The values for resetting the password.
 * @returns {Promise<{error?: string, success?: string}>} The result of the reset password request.
 */
export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedEmail = ResetPasswordSchema.safeParse(values);
  if (!validatedEmail.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedEmail.data;

  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    return { error: "User not found" };
  }

  const resetPasswordToken = await createResetPasswordToken(email);
  await sendResetPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "Password reset email sent" };
};

/**
 * This method uses Resend to send an email to change the user's password
 * @param {string} email - The user's email.
 * @param {string} token - The reset password token.
 * @returns {Promise<{error?: string, success?: string}>} The result of the email sending request.
 */
export const sendResetPasswordEmail = async (email: string, token: string) => {
  const { DALIM_URL, RESEND_EMAIL_FROM } = process.env;

  if (!DALIM_URL || !RESEND_EMAIL_FROM) {
    return {
      error: "Insufficient environment configuration for email sending.",
    };
  }

  const resetUrl = `${DALIM_URL}/reset-password?token=${token}`;

  try {
    await mail.emails.send({
      from: RESEND_EMAIL_FROM,
      to: email,
      subject: "Reset Password",
      html: `<p>Click <a href="${resetUrl}">here</a> to change your password.</p>`,
    });
    return {
      success: "Email sent successfully",
    };
  } catch (err) {
    // You can improve error message based on err if you want
    return {
      error: "Failed to send email.",
    };
  }
};


/**
 * This method updates the user's password
 * @param {z.infer<typeof NewPasswordSchema>} passwordData - The new password data.
 * @param {string | null} token - The reset password token.
 * @returns {Promise<{error?: string, success?: string}>} The result of the password change request.
 */
export const changePassword = async (
  passwordData: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Token not found" };
  }

  const validatedPassword = NewPasswordSchema.safeParse(passwordData);

  if (!validatedPassword.success) {
    return { error: "Invalid data" };
  }

  const { password } = validatedPassword.data;

  const existingToken = await findResetPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token expired" };
  }

  const existingUser = await findUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "User not found" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await updatePassword(existingUser.id, hashedPassword);

  await deleteResetPasswordToken(existingToken.id);

  return { success: "Password updated" };
};
