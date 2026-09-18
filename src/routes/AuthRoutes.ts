import express from 'express';
import { AuthController } from '../controller/Auth';
import { UserServices } from '../services/UserServices';
import { AppDataSource } from '../config/data-source';

const router = express.Router();

const userRepository = AppDataSource.getRepository('User');
const userServices = new UserServices(userRepository);
const authController = new AuthController(userServices);

router.post('/register', (req, res) => authController.register(req, res));

export default router;
