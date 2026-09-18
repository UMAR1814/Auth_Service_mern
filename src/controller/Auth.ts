import { Response } from 'express';
import { RegisterUserRequest } from '../types';
import { UserServices } from '../services/UserServices';

export class AuthController {
    constructor(private userServices: UserServices) {}

    async register(req: RegisterUserRequest, res: Response) {
        const { username, email, password } = req.body;
        const user = await this.userServices.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            id: user.id,
            message: 'User registered successfully',
        });
    }
}
