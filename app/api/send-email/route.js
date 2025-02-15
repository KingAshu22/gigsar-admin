import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req, res) {
  const { emails, subject, htmlContent } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bookanartist2@gmail.com",
      pass: "ctux wtji chcg wppc", // Set this in your .env file
    },
  });

  try {
    for (const email of emails) {
      await transporter.sendMail({
        from: "bookanartist2@gmail.com",
        to: email,
        subject: subject,
        html: htmlContent,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay to reduce spam risk
    }

    return NextResponse.json("Email Send Successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
