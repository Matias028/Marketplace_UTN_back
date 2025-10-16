import express from 'express';
import { getcar, createCar, getCarById, updateCar, deleteCar } from '../controllers/carController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getcar);
router.get('/:id', getCarById);
router.post('/', authMiddleware, createCar);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);

export default router;
