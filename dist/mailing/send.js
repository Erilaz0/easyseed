"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    port: 465,
    auth: {
        user: "alonsoalonsl431432@gmail.com",
        pass: "mcelewoqiksjafvk"
    },
    tls: {
        rejectUnauthorized: false
    }
});
const likesAdviceEmail = (email) => {
    return transporter.sendMail({
        from: "alonsoalonsl431432@gmail.com",
        to: email,
        subject: "Email verification from greenlaz",
        html: `if it wasn't you, <a href=http://localhost:5173/home/plants> Enter here to talk with our team </a>`
    });
};
exports.default = likesAdviceEmail;
