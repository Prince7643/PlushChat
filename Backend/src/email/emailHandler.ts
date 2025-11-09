import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const emailService = async (
  email: string,
  subject: string,
  content: { username: string; verifyLink: string },
  template: <T>(data: T) => string
): Promise<void> => {
  try {
    const html = template(content);

    const msg = {
      to: email,
      from: {
        name: "MyApp",
        email: process.env.EMAIL!, // <-- your verified Gmail
      },
      subject,
      html,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully to:", email);
  } catch (error) {
    console.error("❌ SendGrid Error:", error);
    throw error;
  }
};

export default emailService;
