import * as z from "zod"

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(50),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  bio: z.string().max(160).optional(),
  summary: z.string().max(500).optional(),
  image: z.string().url().optional().or(z.literal("")),
  coverImage: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  twitter: z.string().max(50).optional(),
  instagram: z.string().max(50).optional(),
  linkedin: z.string().max(100).optional(),
})

export const updateSecuritySchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).optional(),
  isTwoFactorAuthEnabled: z.boolean(),
})


export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(160, "Bio must be less than 160 characters").optional(),
  summary: z.string().max(500, "Summary must be less than 500 characters").optional(),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  coverImage: z.string().url("Invalid cover image URL").optional().or(z.literal("")),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  twitter: z.string().max(50, "Twitter handle must be less than 50 characters").optional(),
  instagram: z.string().max(50, "Instagram handle must be less than 50 characters").optional(),
  linkedin: z.string().max(100, "LinkedIn URL must be less than 100 characters").optional(),
})

export const securitySchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters").optional(),
  confirmPassword: z.string().optional(),
  isTwoFactorAuthEnabled: z.boolean(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false
  }
  return true
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
