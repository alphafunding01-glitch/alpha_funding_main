// app/api/sendMail/route.ts
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const SMTP_SERVER_USERNAME = "demonking4529@gmail.com";
const SMTP_SERVER_PASSWORD = "ymze zfrp iisj lylq";

const RECIPIENTS = [
    "contact@alpha fundingcf.com"
];

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
});

// Handle OPTIONS (CORS preflight)
export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, { status: 200 });
}

// Handle POST (form submission)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            first_name,
            middle_names,
            sur_name,
            email,
            contact,
            company_name,
            job_title,
            website_link,
            message,
        } = body;

        // ✅ Validation
        if (!first_name || !sur_name || !email || !contact || !company_name || !job_title) {
            return NextResponse.json(
                { success: false, error: "Missing required fields." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: "Invalid email format." },
                { status: 400 }
            );
        }

        const emailSubject = `📩 New Contact Form Submission from ${first_name} ${sur_name}`;

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; background: #f9f9f9; padding: 20px;">
        <div style="background: #fff; padding: 20px; border-radius: 8px;">
          <h2 style="border-bottom: 2px solid #007bff; padding-bottom: 8px; margin-bottom: 20px;">
            📋 New Contact Form Submission
          </h2>

          <table style="width:100%; border-collapse: collapse;">
            <tr><td><b>Full Name:</b></td><td>${first_name} ${middle_names || ""} ${sur_name}</td></tr>
            <tr><td><b>Email:</b></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td><b>Contact Number:</b></td><td><a href="tel:${contact}">${contact}</a></td></tr>
            <tr><td><b>Company Name:</b></td><td>${company_name}</td></tr>
            <tr><td><b>Job Title:</b></td><td>${job_title}</td></tr>
            ${
            website_link
                ? `<tr><td><b>Website:</b></td><td><a href="${website_link}" target="_blank">${website_link}</a></td></tr>`
                : ""
        }
          </table>

          ${
            message
                ? `<div style="margin-top:20px; padding: 10px; background:#eef7ff; border-left: 4px solid #007bff;">
                  <b>Message:</b><br/> ${message}
                </div>`
                : ""
        }

          <p style="margin-top:20px; font-size:12px; color:#555;">
            📅 Received: ${new Date().toLocaleString("en-UK", {
            timeZone: "Europe/London",
        })}
          </p>
        </div>
      </div>
    `;

        const mailOptions = {
            from: `"Alpha Funding Contact Form" <${SMTP_SERVER_USERNAME}>`,
            to: RECIPIENTS,
            subject: emailSubject,
            html: htmlContent,
            replyTo: email,
        };

        const info = await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Form submitted successfully!", messageId: info.messageId },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("❌ Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send email", details: error.message },
            { status: 500 }
        );
    }
}

// For GET testing
export async function GET() {
    return NextResponse.json({ message: "Contact Form API is working ✅" });
}
