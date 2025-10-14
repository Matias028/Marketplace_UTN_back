export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email requerido' });
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return res.status(400).json({ message: 'Email inválido' });
  next();
};
