import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { Roles } from '../constants';

export class UserServices {
    constructor(private userRepository: Repository<User>) {}
    async create({ username, email, password }: Omit<User, 'id'>) {
        try {
            const user = await this.userRepository.save({
                username,
                email,
                password,
                role: Roles.CUSTOMER,
            });
            return user;
        } catch (error) {
            throw new Error({ message: 'Error creating user', cause: error });
        }
    }
}
