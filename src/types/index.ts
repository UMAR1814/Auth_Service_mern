import { Request } from 'express';

export interface User {
    username: string;
    email: string;
    password: string;
}

export interface RegisterUserRequest extends Request {
    body: User;
}
