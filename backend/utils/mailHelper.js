const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const mailHelper = async (user) => {
  //send grid setup
  const transport = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_KEY,
      },
    })
  );

  transport
    .sendMail({
      to: user.email,
      from: "tpcoin08@gmail.com",
      subject: user.subject,
      html: user.message,
    })
    .then(console.log("Success!"))
    .catch((err) => console.log(err));

  //mailtrap setup
  // let transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });

  // const info = {
  //   from: "tpcoin08@gmail.com",
  //   to: user.email,
  //   subject: user.subject,
  //   html: user.message,
  // };
  // await transporter.sendMail(info);
};

module.exports = mailHelper;
