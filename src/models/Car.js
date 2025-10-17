import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Car = sequelize.define("Car", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  brand: DataTypes.STRING,
  model: DataTypes.STRING,
  year: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(12, 2),
  mileage: DataTypes.INTEGER,
  location: DataTypes.STRING,
  condition: {
    type: DataTypes.ENUM("Usado", "Seminuevo", "Nuevo"),
    defaultValue: "Usado"
  },
  description: DataTypes.TEXT,
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "car",  
  underscored: true,
  timestamps: false
});


User.hasMany(Car, { foreignKey: "user_id", as: "cars" });
Car.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default Car;
