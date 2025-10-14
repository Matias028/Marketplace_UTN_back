import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const register = async (req, res) => {
  const { name, email, password, phone, city } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Faltan datos requeridos' });

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'El email ya está registrado' });

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed, phone, city });
    res.status(201).json({ message: 'Usuario creado', user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Faltan email o password' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login exitoso', token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
