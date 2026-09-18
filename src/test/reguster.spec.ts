import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../config/data-source';
import { DataSource } from 'typeorm';
import { truncateTable } from './utils';

type RegisterResponse = {
    id: number;
};

describe('POST /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    beforeEach(async () => {
        await truncateTable(connection);
    });

    describe('all the fields are valid', () => {
        it('should return 201 and the user data', async () => {
            const response = await request(app).post('/auth/register').send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            });
            expect(response.status).toBe(201);
        });

        it('should return valud json response', async () => {
            const response = await request(app).post('/auth/register').send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            });
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('application/json'),
            );
        });

        it('should persist the user in the database', async () => {
            const user = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            await request(app).post('/auth/register').send(user);

            const userRepository = connection.getRepository('User');
            const users = await userRepository.find();
            expect(users.length).toBe(1);
            expect(users[0].username).toBe(user.username);
            expect(users[0].email).toBe(user.email);
            expect(users[0].password).toBe(user.password);
        });
        it('should return id of the registered user', async () => {
            const user = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            const response = await request(app)
                .post('/auth/register')
                .send(user);

            console.log('Response:', response.body);

            const body = response.body as RegisterResponse;

            expect(body.id).toBeDefined();
        });

        describe('Fields are missing', () => {});
    });
});
