import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from "../utils/sendEmail.js";
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key';


export const register = async (req, res) => {
  try {
    const { name, email, password, phone, city } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Faltan datos requeridos" });


    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "El email ya está registrado" });


    const hashed = await hashPassword(password);

    const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
      city,
      is_verified: false,
      verification_token: verificationToken,
    });


    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "Usuario creado. Verifica tu email para activar la cuenta.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};


export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // <-- cambio aquí
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.is_verified = true;
    user.verification_token = null;
    await user.save();

    res.status(200).json({ message: "Cuenta verificada correctamente." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Token inválido o expirado" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Faltan email o password" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    if (!user.is_verified)
      return res.status(403).json({ message: "Debes verificar tu email antes de iniciar sesión" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login exitoso", token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

