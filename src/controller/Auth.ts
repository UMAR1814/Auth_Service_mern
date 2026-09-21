import fs from 'fs';
import { Response } from 'express';
import { JwtPayload, sign } from 'jsonwebtoken';
import { RegisterUserRequest } from '../types';
import { UserServices } from '../services/UserServices';
import { NextFunction } from 'express';
import { Logger } from 'winston';
import { validationResult } from 'express-validator';
import path from 'path';
import { Config } from '../config';
import createHTTPError from 'http-errors';
import { AppDataSource } from '../config/data-source';
import { RefreshToken } from '../entities/RefreshToken';

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

            let privateKeyPath: Buffer;
            try {
                privateKeyPath = fs.readFileSync(
                    path.join(__dirname, '../../certs/private.pem'),
                );
            } catch (error) {
                this.logger.error('Error reading private key file:', error);
                const err = createHTTPError(500, 'Private key not found');
                next(err);
                return;
            }
            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };
            const accessToken = sign(payload, privateKeyPath, {
                algorithm: 'RS256',
                expiresIn: '1h',
                issuer: 'auth-service',
            });

            const MS_IN_A_YEAR = 365 * 24 * 60 * 60 * 1000;
            const refreshTokenRepository =
                AppDataSource.getRepository(RefreshToken);
            const newRefreshToken = await refreshTokenRepository.save({
                user: user,
                expiresAt: new Date(Date.now() + MS_IN_A_YEAR),
            });
            const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
                algorithm: 'HS256',
                expiresIn: '1y',
                issuer: 'auth-service',
                jwtid: String(newRefreshToken.id),
            });

            res.cookie('accessToken', accessToken, {
                domain: 'localhost',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            res.cookie('refreshToken', refreshToken, {
                domain: 'localhost',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
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
