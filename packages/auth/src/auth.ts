import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import jwt from "jsonwebtoken"

import { prisma } from "@dalim/db";
import { getUserById } from "./validations/auth";  

async function generateUniqueUsername(baseName: string) {
  let username = baseName.toLowerCase().replace(/\s+/g, "")
  let count = 1

  while (await prisma.user.findUnique({ where: { username } })) {
    username = `${baseName}${count}`
    count++
  }

  return username
}

 
declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
      username?: string
      token?: string // Add token to session
    } & DefaultSession["user"]
  }
}

export async function generateToken(userId: string) {
  const secret = process.env.AUTH_SECRET || "fallback-secret"
  const token = jwt.sign({ sub: userId }, secret, { expiresIn: "7d" })
  return token
}

// Function to verify token
export async function verifyTokenDalim(token: string) {
  try {
    const secret = process.env.AUTH_SECRET || "fallback-secret"
    const decoded = jwt.verify(token, secret) as { sub: string }
    return decoded.sub
  } catch (error) {
    return null
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
  callbacks: { 
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
        session.user.username = token.username as string
        
        if (token.sub) {
          session.user.token = await generateToken(token.sub)
        }
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
