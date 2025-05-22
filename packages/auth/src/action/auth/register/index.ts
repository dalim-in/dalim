"use server";

import { prisma } from "@dalim/db";
import { RegisterSchema } from "../../../schemas/auth";
import { createVerificationToken } from "../../../services";
import { UserRole } from "@prisma/client";
import { Prisma } from "@prisma/client";
import bcryptjs from "bcryptjs";
import type { z } from "zod";
import { sendAccountVerificationEmail } from "../email-verification";

/**
 * Registers a new user using the Credentials provider.
 * @param {z.infer<typeof RegisterSchema>} user - The new user's registration data.
 * @returns {Promise<{ error?: string; success?: string }>} The result of the registration process.
 */
export const register = async (user: z.infer<typeof RegisterSchema>) => {
	const valid = await RegisterSchema.safeParse(user);

	if (!valid.success) {
		return {
			error: "Invalid input data.",
		};
	}

	try {
		const { name, email, password } = user;
		const hashedPassword = await bcryptjs.hash(password, 10);

		const createdUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: UserRole.USER,
			},
		});

		// Send account verification email
		const verificationToken = await createVerificationToken(email);
		await sendAccountVerificationEmail(createdUser, verificationToken.token);

		return {
			success: "A verification email has been sent to your inbox.",
		};
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return {
					error: "This email is already registered.",
				};
			}
		}

		// For unexpected errors, you can log or handle as needed
		throw error;
	}
};
