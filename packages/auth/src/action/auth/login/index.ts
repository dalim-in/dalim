"use server";

import { CredentialsSchema } from "../../../schemas/auth";
import { findUserByEmail } from "../../../validations/auth";
import {
  createTwoFactorAuthToken,
  createVerificationToken,
  deleteTwoFactorAuthTokenById,
  findTwoFactorAuthTokenByEmail,
} from "../../../services";
import { AuthError, CredentialsSignin } from "next-auth";
import type { z } from "zod";
import { sendAccountVerificationEmail } from "../email-verification";
import { sendTwoFactorAuthEmail } from "../two-factor";

/**
 * Handles the login process for users, including email verification and two-factor authentication.
 *
 * @param {z.infer<typeof CredentialsSchema>} credentials - The user credentials.
 * @returns {Promise<{ error?: string; success?: string; data?: { twoFactorAuthEnabled: boolean } }>}
 */
export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
  const validCredentials = await CredentialsSchema.safeParse(credentials);
  if (!validCredentials.success) {
    return {
      error: "Invalid login data.",
    };
  }

  try {
    const { email, code } = validCredentials.data;
    const user = await findUserByEmail(email);

    if (!user) {
      return {
        error: "User not found.",
      };
    }

    // Email verification
    if (!user.emailVerified) {
      if (!user.email) {
        return {
          error: "User email is missing.",
        };
      }

      const verificationToken = await createVerificationToken(user.email);
      await sendAccountVerificationEmail(user, verificationToken.token);

      return {
        success: "Verification email sent successfully.",
      };
    }

    // Two-Factor Authentication
    if (user.isTwoFactorAuthEnabled) {
      if (code) {
        const twoFactorAuthToken = await findTwoFactorAuthTokenByEmail(email);

        if (!twoFactorAuthToken || twoFactorAuthToken.token !== code) {
          return {
            error: "Invalid two-factor authentication code.",
            data: {
              twoFactorAuthEnabled: true,
            },
          };
        }

        const hasExpired = new Date(twoFactorAuthToken.expires) < new Date();

        if (hasExpired) {
          return {
            error: "Two-factor authentication code has expired.",
            data: {
              twoFactorAuthEnabled: true,
            },
          };
        }

        await deleteTwoFactorAuthTokenById(twoFactorAuthToken.id);
      } else {
        // Generate and send code
        const twoFactorAuthToken = await createTwoFactorAuthToken(email);
        await sendTwoFactorAuthEmail(user, twoFactorAuthToken.token);

        return {
          data: {
            twoFactorAuthEnabled: true,
          },
        };
      }
    }

    // If everything passes, return success (actual auth might be handled elsewhere)
    return {
      success: "Login successful.",
    };
  } catch (err) {
    if (err instanceof AuthError) {
      if (err instanceof CredentialsSignin) {
        return {
          error: "Invalid credentials.",
        };
      }
    }

    throw err; // Rethrow unexpected errors
  }
};
