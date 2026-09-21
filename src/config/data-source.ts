import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Config } from './';
import { RefreshToken } from '../entities/RefreshToken';
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: Config.DB_HOST!,
    port: Number(Config.DB_PORT),
    username: Config.DB_USER!,
    password: Config.DB_PASSWORD!,
    database: Config.DB_NAME!,
    synchronize: false,
    logging: false,
    entities: [User, RefreshToken],
    migrations: [],
    subscribers: [],
});
