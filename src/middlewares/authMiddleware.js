import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No autorizado' });
  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token faltante' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};
