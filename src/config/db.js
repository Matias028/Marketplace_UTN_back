import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();




const mysql2 = await import('mysql2'); 
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  dialectModule: mysql2,
});


export default sequelize;



