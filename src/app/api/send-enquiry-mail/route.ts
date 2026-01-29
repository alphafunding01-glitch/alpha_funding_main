import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_SERVER_USERNAME = "demonking4529@gmail.com";
const SMTP_SERVER_PASSWORD = "ymze zfrp iisj lylq";

const RECIPIENTS = [
  "contact@alphafundingcf.com"
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
      // Step 1 Fields
      reference_id,
      submission_type = "PARTIAL", // PARTIAL or COMPLETE
      company_name,
      company_number,
      company_address, // Added for clarity if available
      nature_of_business,
      incorporation_date,
      if_not_company,
      borrow_amount,
      ai_estimate_min,
      ai_estimate_max,
      first_name,
      last_name,
      contact_number,
      email_address,
      privacy_policy,
      terms_of_business,

      // Step 2 & 3 Fields
      purpose_of_funding,
      urgency,
      annual_revenue,
      previous_funding,
      referral_source
    } = body;

    if (!first_name || !last_name || !contact_number || !email_address) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const isComplete = submission_type === "COMPLETE";
    const subjectPrefix = isComplete ? "🟢 Lead Updated - COMPLETE" : "🟡 New Funding Enquiry - PARTIAL";
    const subject = `${subjectPrefix} - ${company_name}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; background: #f4f4f5; padding: 20px;">
        <div style="background: #fff; padding: 25px; border-radius: 12px; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <div style="border-bottom: 2px solid ${isComplete ? '#10b981' : '#eab308'}; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #18181b; font-size: 20px;">
                ${isComplete ? '🚀 Funding Enquiry Complete' : '📝 New Funding Enquiry (Partial)'}
            </h2>
            <div style="margin-top: 5px; font-size: 14px; color: #71717a;">
                Reference: <span style="font-family: monospace; font-weight: bold; color: #000;">${reference_id || 'N/A'}</span>
            </div>
          </div>

          <h3 style="color: #3f3f46; font-size: 16px; border-bottom: 1px solid #f4f4f5; padding-bottom: 8px; margin-top: 0;">🏢 Business Details</h3>
          <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #71717a; width: 40%;">Company Name:</td><td style="font-weight: 600; color: #18181b;">${company_name || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Registration No:</td><td style="color: #18181b;">${company_number || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Address:</td><td style="color: #18181b;">${company_address || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Incorporation Date:</td><td style="color: #18181b;">${incorporation_date || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Industry/Nature:</td><td style="color: #18181b;">${nature_of_business || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Entity Type:</td><td style="color: #18181b;">${if_not_company ? "Sole Trader / Non-Limited" : "Limited Company"}</td></tr>
          </table>

          <h3 style="color: #3f3f46; font-size: 16px; border-bottom: 1px solid #f4f4f5; padding-bottom: 8px;">💷 Funding Request</h3>
          <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #71717a; width: 40%;">Amount Requested:</td><td style="font-weight: 600; color: #18181b; font-size: 16px;">£${borrow_amount}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">AI Estimate:</td><td style="color: #0ea5e9; font-weight: 500;">£${ai_estimate_min || '?'}k - £${ai_estimate_max || '?'}k</td></tr>
            ${isComplete ? `
            <tr><td style="padding: 6px 0; color: #71717a;">Purpose:</td><td style="color: #18181b;">${purpose_of_funding || '-'}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Urgency:</td><td style="color: #18181b;">${urgency || '-'}</td></tr>
            ` : ''}
          </table>

          <h3 style="color: #3f3f46; font-size: 16px; border-bottom: 1px solid #f4f4f5; padding-bottom: 8px;">👤 Contact Details</h3>
          <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #71717a; width: 40%;">Full Name:</td><td style="color: #18181b; font-weight: 500;">${first_name} ${last_name}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Phone:</td><td style="color: #18181b;"><a href="tel:${contact_number}" style="color: #0ea5e9; text-decoration: none;">${contact_number}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Email:</td><td style="color: #18181b;"><a href="mailto:${email_address}" style="color: #0ea5e9; text-decoration: none;">${email_address}</a></td></tr>
          </table>

          ${isComplete ? `
          <h3 style="color: #3f3f46; font-size: 16px; border-bottom: 1px solid #f4f4f5; padding-bottom: 8px;">📊 Additional Info</h3>
          <table style="width:100%; border-collapse: collapse; margin-bottom: 10px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #71717a; width: 40%;">Annual Revenue:</td><td style="color: #18181b;">${annual_revenue || "Not provided"}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Previous Funding:</td><td style="color: #18181b;">${previous_funding || "Not provided"}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717a;">Source:</td><td style="color: #18181b;">${referral_source || "Not provided"}</td></tr>
          </table>
          ` : ''}
          
          <div style="margin-top:20px; padding-top: 15px; border-top: 1px dashed #e4e4e7; font-size: 12px; color: #a1a1aa; text-align: center;">
            Compliance: Privacy (${privacy_policy ? "Yes" : "No"}) | Terms (${terms_of_business ? "Yes" : "No"})<br/>
            Received: ${new Date().toLocaleString("en-UK", { timeZone: "Europe/London" })}
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Alpha Funding Form" <${SMTP_SERVER_USERNAME}>`,
      to: RECIPIENTS,
      subject: subject,
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
