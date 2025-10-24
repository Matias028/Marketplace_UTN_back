import Sequelize from 'sequelize';
import mysql2 from 'mysql2';



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false, 
  }
);


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa ✅');
  } catch (error) {
    console.error('Error al conectar a la base de datos ❌', error);
  }
}
testConnection();

export default sequelize;
