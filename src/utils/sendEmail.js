import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const verificationLink = `${process.env.BACKEND_URL}/api/auth/verify?token=${token}`;

    const mailOptions = {
        from: `"AutoMarket" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Verifica tu cuenta en AutoMarket",
        html: `
        <h2>¡Bienvenido a AutoMarket!</h2>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <br><br>
        <p>Si no creaste esta cuenta, ignora este mensaje.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};
