import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Car from './Car.js';

const CarImage = sequelize.define('CarImage', {
  image_url: { type: DataTypes.STRING, allowNull: false },
  is_main: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'car_images',
  underscored: true,
});

Car.hasMany(CarImage, { foreignKey: 'car_id', as: 'images' });
CarImage.belongsTo(Car, { foreignKey: 'car_id', as: 'car' });

export default CarImage;
