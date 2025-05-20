import { betterAuth } from "better-auth";
import type { BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@dalim/db";
import { sendEmail } from "./emails";
import { openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import ChangeEmail from "./emails/change-email";
import ResetPasswordEmail from "./emails/reset-password-email";
import VerifyEmail from "./emails/verify-email";
import {
  TRUSTED_ORIGINS,
  DALIM_URL,
} from "./constants";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: TRUSTED_ORIGINS, 
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days 
    updateAge: 60 * 60 * 24 * 7, // 7 days (every 7 days the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
      premium: {
        type: "boolean",
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }) => {
        await sendEmail({
          to: newEmail,
          subject: "Verify your email change",
          template: ChangeEmail,
          props: { url },
        })
      }
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
  },
  plugins: [openAPI(), admin({
    impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
  })], // api/auth/reference
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        template: ResetPasswordEmail,
        props: { url },
      })
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${DALIM_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        template: VerifyEmail,
        props: { url: verificationUrl },
      })
    },
  }
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
