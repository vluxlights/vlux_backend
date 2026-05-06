import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ check connection
    await transporter.verify();
    console.log("✅ SMTP connected");

    // ✅ send mail
    await transporter.sendMail({
      from: `"Vlux Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent");

  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

export default sendEmail;