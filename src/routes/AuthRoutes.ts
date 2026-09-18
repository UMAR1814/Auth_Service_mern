import express from 'express';
import { AuthController } from '../controller/Auth';
import { UserServices } from '../services/UserServices';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import Logger from '../config/logger';
const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userServices = new UserServices(userRepository);
const authController = new AuthController(userServices, Logger);

router.post('/register', (req, res, next) =>
    authController.register(req, res, next),
);

export default router;
