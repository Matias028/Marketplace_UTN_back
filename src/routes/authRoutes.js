import express from "express";
import { register, login, verifyEmail } from "../controllers/authController.js";
import { validateEmail } from "../middlewares/validateEmail.js";
import { validatePassword } from "../middlewares/validatePassword.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
router.post("/register", validatePassword, validateEmail, register);
router.post("/login", login);
router.get("/verify", async (req, res) => {
    const { token } = req.query;

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });

    let title, message, btnText, btnLink, alertColor;

    if (!user) {
        title = "Usuario no encontrado";
        message =
        "Lo sentimos, no pudimos encontrar una cuenta asociada con este enlace.";
        btnText = "Registrarse";
        btnLink = `${process.env.FRONTEND_URL}/register`;
      alertColor = "#000"; // negro
    } else if (user.is_verified) {
        title = "Cuenta ya verificada";
        message =
        "Tu cuenta ya fue verificada anteriormente. ¡Puedes iniciar sesión!";
        btnText = "Iniciar Sesión";
        btnLink = `${process.env.FRONTEND_URL}/login`;
      alertColor = "#000"; // negro
    } else {
        user.is_verified = true;
        user.verification_token = null;
        await user.save();

        title = "Cuenta verificada correctamente ✅";
        message =
            "¡Gracias por verificar tu correo! Ahora puedes iniciar sesión en nuestra plataforma.";
        btnText = "Iniciar Sesión";
        btnLink = `${process.env.FRONTEND_URL}/login`;
      alertColor = "#48bb78a2"; // verde
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verificación de Cuenta</title>
        <style>
            body {
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #fff;
            color: #000;
            }
            .container {
            text-align: center;
            background: #fff;
            padding: 2rem 3rem;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.13);
            max-width: 450px;
            border: 1px solid #00000034;
            }
            h1 {
            color: ${alertColor};
            font-size: 1.8rem;
            margin-bottom: 1rem;
            }
            p {
            font-size: 1rem;
            color: #000;
            margin-bottom: 1.5rem;
            }
            a.btn {
            display: inline-block;
            padding: 0.6rem 1.5rem;
            background: ${alertColor};
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 8px;
            transition: background 0.3s ease, transform 0.2s ease;
            }
            a.btn:hover {
            background: ${alertColor}CC;
            transform: translateY(-2px);
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>${title}</h1>
            <p>${message}</p>
            <a href="${btnLink}" class="btn">${btnText}</a>
        </div>
        </body>
        </html>
    `);
    } catch (err) {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error de Verificación</title>
        <style>
            body {
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #fff;
            color: #000;
            }
            .container {
            text-align: center;
            background: #fff;
            padding: 2rem 3rem;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            max-width: 450px;
            border: 1px solid #000;
            }
            h1 {
            color: #000;
            font-size: 1.8rem;
            margin-bottom: 1rem;
            }
            p {
            font-size: 1rem;
            color: #000;
            margin-bottom: 1.5rem;
            }
            a.btn {
            display: inline-block;
            padding: 0.6rem 1.5rem;
            background: #000;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 8px;
            transition: background 0.3s ease, transform 0.2s ease;
            }
            a.btn:hover {
            background: #333;
            transform: translateY(-2px);
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Token inválido o expirado ❌</h1>
            <p>El enlace de verificación ya no es válido. Intenta registrarte nuevamente.</p>
            <a href="${process.env.FRONTEND_URL}/register" class="btn">Registrarse</a>
        </div>
        </body>
        </html>
    `);
    }
});

export default router;
