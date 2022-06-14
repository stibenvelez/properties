import { insertSuscription } from "./suscriptions.DAL.js";
import nodemailer from "nodemailer";

export const inserSuscriptionService = async (email) => {
    try {
        await insertSuscription(email);

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "foster.fahey72@ethereal.email",
                pass: "bVyv9FPA59eBTtsj4D",
            },
        });

        const mailOptions = {
            from: '"Fred Foo 👻" <foster.fahey72@ethereal.email>', // sender address
            to: "stibenvelez@hotmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        };


        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.log(error);
        throw error;
    }
};
