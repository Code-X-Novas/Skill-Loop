// functions/index.js
require("dotenv").config();
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const gmailEmail = import.meta.env.EMAIL_USER;
const gmailPassword = import.meta.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.sendContactEmail = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).send("Method Not Allowed");
        }

        const { name, email, message, phone } = req.body;

        const mailOptions = {
            from: email,
            to: gmailEmail,
            subject: `📩 New Contact Us Message from ${name}`,
            html: `
                <div style="line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <div style="background: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold;">
                        New Contact Us Message
                    </div>
                    <div style="padding: 20px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4CAF50;">${email}</a></p>
                        <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
                        <p style="margin: 0;"><strong>Message:</strong></p>
                        <p style="background: #f9f9f9; padding: 10px; border-radius: 6px; white-space: pre-line;">
                            ${message}
                        </p>
                    </div>
                    <div style="background: #f1f1f1; padding: 10px; font-size: 12px; text-align: center; color: #555;">
                        This email was generated from your website's Contact Us form.
                    </div>
                </div>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res
                .status(200)
                .send({ success: true, message: "Email sent!" });
        } catch (error) {
            console.error("Email error:", error);
            return res
                .status(500)
                .send({ success: false, message: error.message });
        }
    });
});
