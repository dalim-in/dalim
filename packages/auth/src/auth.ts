import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

import { prisma } from "@dalim/db";
import { getUserById } from "./validations/auth";  

const sanitize = (str: string) => str.toLowerCase().replace(/\s+/g, "");

async function generateUniqueUsername(name: string) {
  const base = sanitize(name || "user");
  let username = base;
  let count = 1;

  while (await prisma.user.findUnique({ where: { username } })) {
    username = `${base}${count}`;
    count += 1;
  }

  return username;
}
 
declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
	signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    // error: "/auth/error",
  },  
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.dalim.in' : undefined,
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.callback-url' 
        : 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.dalim.in' : undefined,
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Host-next-auth.csrf-token' 
        : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // Note: CSRF token should NOT have domain set for security reasons
        // domain: undefined, // Keep this undefined for CSRF token
      },
    },
    state: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.state' 
        : 'next-auth.state',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 900, // 15 minutes
        domain: process.env.NODE_ENV === 'production' ? '.dalim.in' : undefined,
      },
    },
    nonce: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.nonce' 
        : 'next-auth.nonce',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.dalim.in' : undefined,
      },
    },
  },
  events: {
    async linkAccount({ user }) {
      // When an account is linked, mark email as verified
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: { 
    async signIn({ user, account, profile }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true

      // For credentials, check email verification
      const existingUser = await getUserById(user.id!)

      if (!existingUser?.emailVerified) {
        return false
      }

      return true
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        if (token.role) {
          session.user.role = token.role as UserRole;
        }
 
        session.user.name = token.name;
        session.user.image = token.picture;
        
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await getUserById(token.sub);

      if (!dbUser) return token;

      if (!dbUser.username) {
        const newUsername = await generateUniqueUsername(dbUser.name || "user");
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { username: newUsername },
        });
        dbUser.username = newUsername;
      }

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.role = dbUser.role;
      token.username = dbUser.username;

      return token;
    },
  },
  ...authConfig,
  // debug: process.env.NODE_ENV !== "production"
});
