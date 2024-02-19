const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});

exports.smtpAuth = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      console.error("Request has invalid method:", req.method);
      return res.status(405).send("Method Not Allowed");
    }

    if (!req.body || !req.body.username || !req.body.password) {
      console.error("Request body is missing data:", req.body);
      return res.status(400).send("Bad Request: Missing username or password");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.kth.se",
      port: 587,
      secure: false, // Note: true for 465, false for other ports
      auth: {
        user: req.body.username,
        pass: req.body.password,
      },
    });

    try {
      await transporter.verify();
      return res.status(200).send({success: true});
    } catch (error) {
      console.error("Authentication failed:", error);
      return res.status(403).send("Authentication failed, try again.");
    }
  });
});
