import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateEmail } from '../middlewares/validateEmail.js';

const router = express.Router();

router.post('/register', validateEmail, register);
router.post('/login', login);

export default router;
