import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { Roles } from '../constants';
import { UserData } from '../types';
import bcrypt from 'bcrypt';

export class UserServices {
    constructor(private userRepository: Repository<User>) {}
    async create({ username, email, password }: UserData): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
            const user = await this.userRepository.save({
                username,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            });
            return user;
        } catch (error) {
            throw new Error(`Error creating user: ${(error as Error).message}`);
        }
    }
}
