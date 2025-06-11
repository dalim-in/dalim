import { EmailTemplate } from "@/src/emails/email-wiatlist";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server"; 

const resend = new Resend(process.env.RESEND_API_KEY); 
const fromEmail = "contact@dalim.in"
const siteName = "Dalim" 
const siteUrl = process.env.DALIM_URL;
const unsubscribeUrl = `${siteUrl}/unsubscribe`;
const subject = `You’re on the waitlist for ${siteName}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  try {
    const sendEmail = await resend.emails.send({
      from: fromEmail as string,
      to: [body.email],
      subject: subject,
      react: EmailTemplate(),
      headers: {
        "List-Unsubscribe": unsubscribeUrl,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    const addContact = await resend.contacts.create({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      unsubscribed: false,
      audienceId: '1494da0f-15ba-44b6-94b1-afa1f1832a6e',
    });

    return NextResponse.json({
      sendEmail,
      addContact,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}