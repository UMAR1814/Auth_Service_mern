import { Response } from 'express';
import { RegisterUserRequest } from '../types';
import { UserServices } from '../services/UserServices';
import { NextFunction } from 'express';
import { Logger } from 'winston';

export class AuthController {
    constructor(
        private userServices: UserServices,
        private logger: Logger,
    ) {}

    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { username, email, password } = req.body;
        this.logger.info(`Registering user: ${username}`);
        try {
            const user = await this.userServices.create({
                username,
                email,
                password,
            });
            this.logger.info(`User registered successfully: ${user.username}`);
            res.status(201).json({
                id: user.id,
                message: 'User registered successfully',
            });
        } catch (error) {
            next(error);
            return;
        }
    }
}
