import {NextRequest, NextResponse} from "next/server";
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

        const {firstName, lastName, email, contactNo, jobProfile, description} = body;

        if (!firstName || !lastName || !email || !contactNo || !jobProfile || !description) {
            return NextResponse.json(
                {success: false, error: "Missing required fields."},
                {status: 400}
            );
        }

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; background: #f9f9f9; padding: 20px;">
        <div style="background: #fff; padding: 20px; border-radius: 8px;">
          <h2 style="border-bottom: 2px solid #28a745; padding-bottom: 8px;">
            🤝 New Partner Form Submission
          </h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td><b>First Name:</b></td><td>${firstName}</td></tr>
            <tr><td><b>Last Name:</b></td><td>${lastName}</td></tr>
            <tr><td><b>Email:</b></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td><b>Contact Number:</b></td><td>${contactNo}</td></tr>
            <tr><td><b>Job Profile:</b></td><td>${jobProfile}</td></tr>
            <tr><td><b>Description:</b></td><td>${description}</td></tr>
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
            from: `"Partner Form" <${SMTP_SERVER_USERNAME}>`,
            to: RECIPIENTS,
            subject: `New Partner Request - ${firstName} ${lastName}`,
            html: htmlContent,
            replyTo: email,
        });

        return NextResponse.json({success: true, message: "Partner form submitted successfully!"});
    } catch (error: any) {
        console.error("Partner API Error:", error);
        return NextResponse.json(
            {success: false, error: "Failed to send partner form", details: error.message},
            {status: 500}
        );
    }
}

export async function GET() {
    return NextResponse.json({message: "Partner Form API is working ✅"});
}
