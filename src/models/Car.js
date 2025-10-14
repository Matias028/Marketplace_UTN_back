import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Car = sequelize.define('Car', {
  title: { type: DataTypes.STRING },
  brand: { type: DataTypes.STRING },
  model: { type: DataTypes.STRING },
  year: { type: DataTypes.INTEGER },
  price: { type: DataTypes.DECIMAL(12,2) },
  mileage: { type: DataTypes.INTEGER },
  location: { type: DataTypes.STRING },
  condition: { type: DataTypes.ENUM('Usado','Seminuevo','Nuevo'), defaultValue: 'Usado' },
  description: { type: DataTypes.TEXT },
  image_url: { type: DataTypes.STRING },
}, {
  tableName: 'cars',
  underscored: true,
});

User.hasMany(Car, { foreignKey: 'user_id', as: 'cars' });
Car.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Car;
