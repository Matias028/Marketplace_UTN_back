import Car from '../models/Car.js';
import CarImage from '../models/CarImage.js';
import User from '../models/User.js';


export const getcar = async (req, res) => {
  try {
    const cars = await Car.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id','name','email','phone','city'] },
        { model: CarImage, as: 'images' },
      ],
    });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id','name','email','phone','city'] },
        { model: CarImage, as: 'images' },
      ],
    });
    if (!car) return res.status(404).json({ message: 'Auto no encontrado' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCarsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cars = await Car.findAll({
      where: { user_id: userId },
      include: [
        { model: User, as: 'user', attributes: ['id','name','email','phone','city'] },
        { model: CarImage, as: 'images' },
      ],
    });

    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCar = async (req, res) => {
  try {
    const { title, brand, model, year, price, mileage, location, condition, description, imageUrl } = req.body;
    const user_id = req.user?.id;
    if (!user_id) return res.status(401).json({ message: 'No autorizado' });

    const car = await Car.create({ user_id, title, brand, model, year, price, mileage, location, condition, description });

    if (imageUrl) {
      await CarImage.create({
        car_id: car.id,
        url: imageUrl,
      });
    }

    const carWithImages = await Car.findByPk(car.id, {
      include: [
        { model: User, as: 'user', attributes: ['id','name','email','phone','city'] },
        { model: CarImage, as: 'images' },
      ],
    });

    res.status(201).json(carWithImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, ...updateData } = req.body;

    const car = await Car.findByPk(id, { include: { model: CarImage, as: 'images' } });
    if (!car) return res.status(404).json({ message: 'Auto no encontrado' });
    if (car.user_id !== req.user.id) return res.status(403).json({ message: 'No autorizado para editar' });
    await car.update(updateData);

  
    if (imageUrl) {
      if (car.images && car.images.length > 0) {
        await CarImage.update({ url: imageUrl }, { where: { car_id: car.id } });
      } else {
        await CarImage.create({ car_id: car.id, url: imageUrl });
      }
    }

    const updatedCar = await Car.findByPk(car.id, {
      include: [
        { model: User, as: 'user', attributes: ['id','name','email','phone','city'] },
        { model: CarImage, as: 'images' },
      ],
    });

    res.json(updatedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Auto no encontrado' });
    if (car.user_id !== req.user.id) return res.status(403).json({ message: 'No autorizado para eliminar' });

    await CarImage.destroy({ where: { car_id: car.id } });
    await car.destroy();

    res.json({ message: 'Auto e imágenes eliminados correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
