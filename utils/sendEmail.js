import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, otp) => {
  try {
    const response = await resend.emails.send({
      from: "Vlux Lights <onboarding@resend.dev>",
      to,
      subject: "🔐 Password Reset OTP - Vlux",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>Your OTP code is:</p>

          <h1 style="color: #ff4d4d;">${otp}</h1>

          <p>This OTP is valid for 5 minutes.</p>

          <br/>
          <p>If you did not request this, please ignore this email.</p>

          <hr/>
          <p style="font-size:12px; color:gray;">
            Vlux Lights Support Team
          </p>
        </div>
      `,
    });

    console.log("✅ Email sent:", response);
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

export default sendEmail;