import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const SMTP_SERVER_USERNAME = process.env.SMTP_USER ?? "";
const SMTP_SERVER_PASSWORD = process.env.SMTP_PASS ?? ""; // Note: User aware this needs updating later
const INTERNAL_BCC = "contact@alpha-funding.co.uk";

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
        const { email, pdfBase64, quoteSummary } = body;

        if (!email || !pdfBase64) {
            return NextResponse.json(
                { success: false, error: "Missing email or PDF data" },
                { status: 400 }
            );
        }

        const emailSubject = "Your Alpha Funding Loan Quote";

        // Convert base64 PDF to buffer
        const pdfBuffer = Buffer.from(pdfBase64.split(",")[1], "base64");

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
                <h1 style="color: #000428; margin-bottom: 20px;">Your Loan Quote</h1>
                <p style="color: #555; line-height: 1.6;">
                    Hello,
                </p>
                <p style="color: #555; line-height: 1.6;">
                    Thank you for using the Alpha Funding Business Loan Calculator. 
                    Please find your detailed quote attached as a PDF.
                </p>
                
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #000428;">Quick Summary</h3>
                    <ul style="padding-left: 20px; color: #555;">
                        <li><b>Loan Amount:</b> £${quoteSummary?.amount}</li>
                        <li><b>Total Repayable:</b> £${quoteSummary?.totalPayable}</li>
                        <li><b>Monthly Payment:</b> £${quoteSummary?.monthlyPayment}</li>
                    </ul>
                </div>

                <p style="color: #888; font-size: 12px; margin-top: 30px;">
                    *This quote is an estimate based on the information provided and does not constitute a guarantee of funding.
                </p>
            </div>
        `;

        const mailOptions = {
            from: `"Alpha Funding Calculator" <${SMTP_SERVER_USERNAME}>`,
            to: email,
            bcc: INTERNAL_BCC, // Lead capture
            subject: emailSubject,
            html: htmlContent,
            attachments: [
                {
                    filename: "Alpha_Funding_Quote.pdf",
                    content: pdfBuffer,
                    contentType: "application/pdf",
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Quote sent successfully!" },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error sending quote email:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send email", details: error.message },
            { status: 500 }
        );
    }
}
