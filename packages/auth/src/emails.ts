"use server"
import * as React from "react";
import SubscriptionEmail from "./emails/subscription-email";
import { Resend } from "resend";
import { env } from "../env";
 
const siteConfig = {
  name: "Dalim",
  url: "https://dalim.in",
  ogImage: "https://dalim.in/og.jpg",
  description:
    "Your complete platform for the Design.",
  links: {
    twitter: "https://twitter.com/dalim-in",
    github: "https://github.com/dalim-in",
  },
  emails: {
    from: {
      name: "Dalim",
      email: "contact@dalim.in",  
    },
  },
   
}

if (!env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(env.RESEND_API_KEY);

// Generic email sending function
export async function sendEmail<T extends Record<string, unknown>>({
  to,
  subject,
  template: EmailTemplate,
  props,
}: {
  to: string;
  subject: string;
  template: React.ComponentType<T>;
  props: T;
}) {
  try {
    const data = await resend.emails.send({
      from: `${siteConfig.emails.from.name} <${siteConfig.emails.from.email}>`,
      to,
      subject,
      react: React.createElement(EmailTemplate, props),
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

// Specific email functions
export async function sendSubscriptionEmail(
  email: string,
  name: string | null,
  type: "created" | "updated" | "cancelled",
) {
  const subject = {
    created: "Welcome to Your Subscription!",
    updated: "Your Subscription Has Been Updated",
    cancelled: "Your Subscription Has Been Cancelled",
  }[type];

  return sendEmail({
    to: email,
    subject,
    template: SubscriptionEmail,
    props: {
      name: name || "there",
      type,
    },
  });
}