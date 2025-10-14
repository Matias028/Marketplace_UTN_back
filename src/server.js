import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);


app.get('/api/health', (req, res) => res.json({
  ok: true,
  health: 'API is running'
}));

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada');
    await sequelize.sync({ alter: true }); 
    console.log('✅ Base de datos sincronizada');
    app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

start();
