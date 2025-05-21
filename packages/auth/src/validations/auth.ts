import * as z from "zod";

import { prisma } from "@dalim/db";
import { Prisma } from "@prisma/client";
import { auth } from "../auth";

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        emailVerified: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

const userSelect = {
  id: true,
  name: true,
  email: true,
  username: true,
  bio: true,
  website: true,
  twitter: true,
  instagram: true,
  linkedin: true,
  image: true,
  coverImage: true,
  createdAt: true,
  role: true,
} as const;

type SelectedUser = Prisma.UserGetPayload<{ select: typeof userSelect }>;

export const getUserById = async (id: string): Promise<SelectedUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });

    return user;
  } catch {
    return null;
  }
};

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      username: true,
      bio: true,
      summary: true,
      website: true,
      twitter: true,
      instagram: true,
      linkedin: true,
      image: true,
      coverImage: true,
      createdAt: true,
    },
  });

  if (!currentUser) {
    return null;
  }

  return {
    ...currentUser,
    role: currentUser.role as "USER" | "ADMIN",
  };
}

