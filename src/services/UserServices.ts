import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { Roles } from '../constants';
import { UserData } from '../types';

export class UserServices {
    constructor(private userRepository: Repository<User>) {}
    async create({ username, email, password }: UserData): Promise<User> {
        try {
            const user = await this.userRepository.save({
                username,
                email,
                password,
                role: Roles.CUSTOMER,
            });
            return user;
        } catch (error) {
            throw new Error(`Error creating user: ${(error as Error).message}`);
        }
    }
}
