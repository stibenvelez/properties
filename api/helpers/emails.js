import nodeMailer from "nodemailer";

export const emailCreateUser = async ({email, fisrtName,lastName, token}) => {

    const transport = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "60b83bea1cfbbc",
            pass: "1c341d0113bffd",
        },
    });


    // info email
    const info = await transport.sendMail({
        from: '"Properties" <properties@correo.com>',
        to: email,
        subject: "Properties - Confirmacion de cuenta",
        text: "Confirma tu cuenta en Properties",
        html: `
            <p>Hola: ${fisrtName}, comprueba tu cuenta como ausuario de properties</p>
            <p>Para confirmar tu cuenta haz click en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar cuenta</a>

            <p>Si no has solicitado una cuenta, puedes ignorar este correo.</p>

        `,
    });

};
