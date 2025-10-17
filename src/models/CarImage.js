import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Car from "./Car.js";

const CarImage = sequelize.define("CarImage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "car_images",  
  underscored: true,
  timestamps: false
});


Car.hasMany(CarImage, { foreignKey: "car_id", as: "images" });
CarImage.belongsTo(Car, { foreignKey: "car_id", as: "car" });

export default CarImage;
