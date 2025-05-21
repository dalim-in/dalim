/* eslint-disable turbo/no-undeclared-env-vars */
import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSchema } from "./schemas/auth";
import { UserNotFound } from "./validations/user-not-found";
import { findUserByEmail } from "./validations/auth";

export default {
  providers: [
    Credentials({
  async authorize(credentials) {
    const validatedCredentials = CredentialsSchema.safeParse(credentials);
    if (!validatedCredentials.success) return null;

    const { email, password } = validatedCredentials.data;
    const user = await findUserByEmail(email);

    if (!user || !user.password) {
      throw new UserNotFound();
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) return null;

    if (!user.emailVerified) {
      // Prevent login if email is not verified
      throw new Error("E-mail não verificado. Verifique seu e-mail antes de continuar.");
    }

    return user;
  },
}),

    Resend,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
