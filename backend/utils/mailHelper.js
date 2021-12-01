import nodemailer from "nodemailer";

const mailHelper = async (user) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = {
    from: "tpcoin08@gmail.com",
    to: user.email,
    subject: user.subject,
    text: user.message,
  };

  await transporter.sendMail(info);
};

export default mailHelper;
