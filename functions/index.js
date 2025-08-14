// functions/index.js
require("dotenv").config();
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const gmailEmail = import.meta.env.EMAIL_USER
const gmailPassword = import.meta.env.EMAIL_PASS

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
            subject: `New Contact Us Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n Phone: ${phone}\n\nMessage:\n${message}`,
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
