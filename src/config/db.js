import Sequelize from 'sequelize';
import mysql2 from 'mysql2';

let sequelize;

if (!global.__sequelize) {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      dialectModule: mysql2,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );

  global.__sequelize = sequelize;
} else {
  sequelize = global.__sequelize;
}

async function testConnectionOnce() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa ✅');
  } catch (error) {
    console.error('Error al conectar a la base de datos ❌', error);
  }
}

if (!global.__sequelizeTested) {
  testConnectionOnce();
  global.__sequelizeTested = true;
}

export default sequelize;
