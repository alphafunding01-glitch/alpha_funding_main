
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const SMTP_SERVER_USERNAME = process.env.SMTP_USER ?? "";
const SMTP_SERVER_PASSWORD = process.env.SMTP_PASS ?? "";

const RECIPIENTS = [
  "sameer.shaikh@alpha-funding.co.uk",
  "lokendra.panchal@alpha-funding.co.uk"
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
    // Assuming body structure for generic enquiry or reusing similar logic
    // If this endpoint is for a different form, I'll adapt the fields.
    // For now, I'll assume it matches the Contact form or is a variation.
    // Let's check if there are specific fields for "enquiry".
    // Usually enquiry might be simpler. I'll include basic fields.

    const {
      name,
      email,
      phone,
      subject,
      message,
      // Add other potential fields if typically used
    } = body;

    // Validation - Basic
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Missing email." },
        { status: 400 }
      );
    }

    const emailSubject = `🚀 New Enquiry: ${subject || "General Enquiry"}`;

    // Brand Colors
    const brandBlue = "#1CB5E0";
    const brandDark = "#030f42";
    const brandText = "#334155";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: ${brandText}; background-color: #f4f7fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .header { background: ${brandDark}; padding: 30px; text-align: center; border-bottom: 4px solid ${brandBlue}; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
          .content { padding: 40px 30px; }
          .section-title { font-size: 14px; color: ${brandBlue}; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 10px; margin-top: 20px; }
          .data-row { display: flex; border-bottom: 1px solid #eef2f6; padding: 12px 0; }
          .data-label { width: 140px; font-weight: 600; color: #64748b; font-size: 14px; }
          .data-value { flex: 1; color: ${brandDark}; font-weight: 500; font-size: 14px; }
          .message-box { background: #f8fafc; border-left: 4px solid ${brandBlue}; padding: 20px; border-radius: 0 8px 8px 0; margin-top: 20px; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #eef2f6; }
          
          @media only screen and (max-width: 600px) {
            .container { margin: 0; border-radius: 0; width: 100% !important; }
            .content { padding: 20px; }
            .data-row { flex-direction: column; }
            .data-label { width: 100%; margin-bottom: 4px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Alpha Funding Enquiry</h1>
          </div>
          
          <div class="content">
            <div style="text-align: center; margin-bottom: 30px;">
               <div style="display: inline-block; background: #e0f2fe; color: ${brandBlue}; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">
                GENERAL ENQUIRY
              </div>
            </div>

            <div class="section-title">Contact Details</div>
            ${name ? `
            <div class="data-row">
              <div class="data-label">Name</div>
              <div class="data-value">${name}</div>
            </div>` : ''}
            <div class="data-row">
              <div class="data-label">Email</div>
              <div class="data-value"><a href="mailto:${email}" style="color:${brandBlue}; text-decoration:none;">${email}</a></div>
            </div>
            ${phone ? `
            <div class="data-row">
              <div class="data-label">Phone</div>
              <div class="data-value"><a href="tel:${phone}" style="color:${brandBlue}; text-decoration:none;">${phone}</a></div>
            </div>` : ''}

            ${message ? `
            <div class="section-title">Message</div>
            <div class="message-box">
              ${message}
            </div>` : ''}
          </div>

          <div class="footer">
            Generated via Alpha Funding Website<br/>
            ${new Date().toLocaleString("en-UK", { timeZone: "Europe/London" })}
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Alpha Funding Website" <${SMTP_SERVER_USERNAME}>`,
      to: RECIPIENTS,
      subject: emailSubject,
      html: htmlContent,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Enquiry sent successfully!", messageId: info.messageId },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email", details: error.message },
      { status: 500 }
    );
  }
}
