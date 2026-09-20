import { Response } from 'express';
import { RegisterUserRequest } from '../types';
import { UserServices } from '../services/UserServices';
import { NextFunction } from 'express';
import { Logger } from 'winston';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

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
    ): Promise<void> {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ errors: result.array() });
            return;
        }

        const { username, email, password } = req.body;

        this.logger.info(`Registering user: ${username}`);
        try {
            const user = await this.userServices.create({
                username,
                email,
                password,
            });
            this.logger.info(`User registered successfully: ${user.username}`);
            res.cookie('accessToken', user.accessToken, {
                httpOnly: true,
                secure: false,
            });
            const privateKey = fs.readFileSync(
                path.join(process.cwd(), 'certs', 'private.pem'),
                'utf8',
            );

            const accessToken = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                    assignedBy: 'auth-service',
                },
                privateKey,
                {
                    algorithm: 'RS256',
                    expiresIn: '1h',
                },
            );

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
            });
            res.cookie('refreshToken', user.refreshToken, {
                httpOnly: true,
                secure: false,
            });

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
