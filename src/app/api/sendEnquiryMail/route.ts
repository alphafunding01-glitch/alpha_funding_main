import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            company_name,
            if_not_company,
            borrow_amount,
            first_name,
            last_name,
            contact_number,
            email_address,
            privacy_policy,
            terms_of_business,
        } = body;

        if (!first_name || !last_name || !contact_number || !email_address) {
            return NextResponse.json(
                { success: false, error: "Missing required fields." },
                { status: 400 }
            );
        }

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; background: #f9f9f9; padding: 20px;">
        <div style="background: #fff; padding: 20px; border-radius: 8px;">
          <h2 style="border-bottom: 2px solid #007bff; padding-bottom: 8px;">
            📝 New Eligibility Form Submission
          </h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td><b>Company Name:</b></td><td>${company_name || "N/A"}</td></tr>
            <tr><td><b>If Not a Company:</b></td><td>${if_not_company ? "Yes" : "No"}</td></tr>
            <tr><td><b>Borrow Amount:</b></td><td>£${borrow_amount}</td></tr>
            <tr><td><b>First Name:</b></td><td>${first_name}</td></tr>
            <tr><td><b>Last Name:</b></td><td>${last_name}</td></tr>
            <tr><td><b>Contact Number:</b></td><td>${contact_number}</td></tr>
            <tr><td><b>Email Address:</b></td><td><a href="mailto:${email_address}">${email_address}</a></td></tr>
            <tr><td><b>Accepted Privacy Policy:</b></td><td>${privacy_policy ? "✅ Yes" : "❌ No"}</td></tr>
            <tr><td><b>Accepted Terms of Business:</b></td><td>${terms_of_business ? "✅ Yes" : "❌ No"}</td></tr>
          </table>
          <p style="margin-top:20px; font-size:12px; color:#555;">
            📅 Received: ${new Date().toLocaleString("en-UK", {
            timeZone: "Europe/London",
        })}
          </p>
        </div>
      </div>
    `;

        await transporter.sendMail({
            from: `"Eligibility Form" <${SMTP_SERVER_USERNAME}>`,
            to: RECIPIENTS,
            subject: `New Eligibility Form - ${first_name} ${last_name}`,
            html: htmlContent,
            replyTo: email_address,
        });

        return NextResponse.json({ success: true, message: "Form submitted successfully!" });
    } catch (error: any) {
        console.error("Eligibility API Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send form", details: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ message: "Eligibility Form API is working ✅" });
}
