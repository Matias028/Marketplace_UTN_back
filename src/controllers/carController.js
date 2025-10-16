import Car from '../models/Car.js';
import CarImage from '../models/CarImage.js';
import User from '../models/User.js';

export const getcar = async (req, res) => {
  try {
    const car = await Car.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id','name','email','phone','city'] },
        { model: CarImage, as: 'images' }
      ],
      order: [['created_at','DESC']],
    });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['id','name','email','phone','city'] }, { model: CarImage, as: 'images' }]
    });
    if (!car) return res.status(404).json({ message: 'Auto no encontrado' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCar = async (req, res) => {
  try {
    const { title, brand, model, year, price, mileage, location, condition, description, imageUrl } = req.body;
    const user_id = req.user?.id; 
    if (!user_id) return res.status(401).json({ message: 'No autorizado' });

    const car = await Car.create({ user_id, title, brand, model, year, price, mileage, location, condition, description, imageUrl });
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Auto no encontrado' });
    if (car.user_id !== req.user.id) return res.status(403).json({ message: 'No autorizado para editar' });

    await car.update(req.body);
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Auto no encontrado' });
    if (car.user_id !== req.user.id) return res.status(403).json({ message: 'No autorizado para eliminar' });

    await car.destroy();
    res.json({ message: 'Auto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
