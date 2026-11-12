import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Credentials come from env vars (the old hardcoded app password must be revoked).
// Required: GMAIL_USER, GMAIL_APP_PASSWORD
export async function POST(req) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
  }

  const { emails, subject, htmlContent } = await req.json().catch(() => ({}));
  if (!Array.isArray(emails) || emails.length === 0 || !subject || !htmlContent) {
    return NextResponse.json({ error: "emails, subject and htmlContent are required" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    for (const email of emails) {
      await transporter.sendMail({
        from: GMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay to reduce spam risk
    }

    return NextResponse.json("Email Send Successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
