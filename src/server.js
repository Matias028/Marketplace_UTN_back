import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/car', carRoutes);


app.get('/api/health', (req, res) => res.json({
  ok: true,
  health: 'API is running'
}));


const PORT = process.env.PORT || 8080;

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
