import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({ email, userId }) => {
  try {
    const unhashedToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(unhashedToken)
      .digest("hex");

    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
    });

    const transport = nodemailer.createTransport({
      host: process.env.HOST_MAILTRAPE,
      port: process.env.PORT_MAILTRAPE,
      auth: {
        user: process.env.USER_MAILTRAPE,
        pass: process.env.PASS_MAILTRAPE,
      },
    });

    const mailOptions = {
      from: "no@gmail.com",
      to: email,
      subject: "Reset your passoword",
      html: `<p>Click <a href="${process.env.domain}/forgotpassword/${unhashedToken}">here</a> to "reset your password"
      or copy and paste the link below in your browser. <br>
     ${process.env.domain}/forgotpassword/${unhashedToken}
      </p>`,
    };

    const mailresonse = await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while sending mail");
  }
};

export const sendReminder = async ({ daysLeft, product, userId }) => {
  try {
    const user = await User.findById(userId);
    const transport = nodemailer.createTransport({
      host: process.env.HOST_MAILTRAPE,
      port: process.env.PORT_MAILTRAPE,
      auth: {
        user: process.env.USER_MAILTRAPE,
        pass: process.env.PASS_MAILTRAPE,
      },
    });

    const mailOptions = {
      from: "no@gmail.com",
      to: user.email,
      subject: "Expiry Reminder",
      html: `
      <h1>${product.name}</h1>
      <p>This product is expirying soon in ${daysLeft} days. Please consume it before it gets expired.</p>
      `,
    };

    const mailresonse = await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while sending mail");
  }
};
