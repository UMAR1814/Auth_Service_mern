import { Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserServices {
    constructor(private userRepository: Repository<User>) {}
    async create({ username, email, password }: User) {
        await this.userRepository.save({
            username,
            email,
            password,
        });
    }
}
