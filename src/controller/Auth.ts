import { Response } from 'express';
import { RegisterUserRequest } from '../types';
import { UserServices } from '../services/UserServices';
import { NextFunction } from 'express';
import { Logger } from 'winston';
import createHttpError from 'http-errors';

export class AuthController {
    userServices: UserServices;
    constructor(
        userServices: UserServices,
        private logger: Logger,
    ) {
        this.userServices = userServices;
    }

    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { username, email, password } = req.body;
        if (!email) {
            const err = createHttpError(400, 'Email is required');
            next(err);
            return;
        }

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
