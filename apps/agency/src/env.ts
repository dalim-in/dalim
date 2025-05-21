import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    // GITHUB_OAUTH_TOKEN: z.string().min(1), 
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1), 
    RESEND_API_KEY: z.string().min(1), 
    RESEND_EMAIL_FROM: z.string().email(),  
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),  
  },
  runtimeEnv: {
    // GITHUB_OAUTH_TOKEN: process.env.GITHUB_OAUTH_TOKEN,  
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,  
    RESEND_API_KEY: process.env.RESEND_API_KEY, 
    RESEND_EMAIL_FROM: process.env.RESEND_EMAIL_FROM, 
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL, 
    // Stripe 
    NODE_ENV: process.env.NODE_ENV,
  },
});
