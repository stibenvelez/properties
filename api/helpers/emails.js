import nodeMailer from "nodemailer";

export const emailCreateUser = async  ({email, fisrtName,lastName, token})   => {

    const transport = nodeMailer.createTransport({
        host: procces.env.EMAIL_HOST,
        port: procces.env.EMAIL_PORT,
        auth: {
            user: procces.env.EMAIL_USER,
            pass: procces.env.EMAIL_PASSWORD,
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

export const emailForgetPassword = async ({ email, fisrtName, lastName, token }) => {

    const transport = nodeMailer.createTransport({
        host: procces.env.EMAIL_HOST,
        port: procces.env.EMAIL_PORT,
        auth: {
            user: procces.env.EMAIL_USER,
            pass: procces.env.EMAIL_PASSWORD,
        },
    });

    // info email
    const info = await transport.sendMail({
        from: '"Properties" <properties@correo.com>',
        to: email,
        subject: "Properties - Restablece tu contraseña",
        text: "Has solicitado restablecer tu contraseña",
        html: `
            <p>Hola: ${fisrtName}, Has solicitado generar una nueva contraseña</p>
            <p>Sigue el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/admin/users/forget-password/${token}">Restrablecer contraseña</a>

            <p>Si no hiciste la solicitud, ignora este correo</p>

        `,
    });
}
