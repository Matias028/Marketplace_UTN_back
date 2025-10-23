import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';

dotenv.config();

const app = express();


const allowedOrigins = [
  process.env.FRONTEND_URL,    
  "http://localhost:3000"      
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (!allowedOrigins.includes(origin)) {
      const msg = `CORS bloqueó el acceso de: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/car', carRoutes);
app.get('/api/health', (req, res) => res.json({
  ok: true,
  health: 'API ok'
}));

const PORT = process.env.PORT || 8080;


const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada');
    await sequelize.sync();
    console.log('✅ Base de datos sincronizada');

    app.listen(PORT, () => console.log(`✅ Backend corriendo en puerto ${PORT}`));
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err);
    process.exit(1);
  }
};

start();
