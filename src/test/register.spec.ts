import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../config/data-source';
import { DataSource } from 'typeorm';
import { Roles } from '../constants';
import { isJWT } from './utils';

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
        await connection.dropDatabase();
        await connection.synchronize();
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
            expect(users[0]?.username).toBe(user.username);
            expect(users[0]?.email).toBe(user.email);
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

            const body = response.body as RegisterResponse;

            expect(body.id).toBeDefined();
        });

        it('should assign a customer role to the user', async () => {
            const user = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            await request(app).post('/auth/register').send(user);

            const userRepository = connection.getRepository('User');
            const users = await userRepository.find();
            expect(users[0]).toHaveProperty('role');
            expect(users[0]?.role).toBe(Roles.CUSTOMER);
        });

        it('Password should be hashed', async () => {
            const user = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            await request(app).post('/auth/register').send(user);

            const userRepository = connection.getRepository('User');
            const users = await userRepository.find();
            expect(users[0].password).not.toBe(user.password);
            expect(users[0].password).toHaveLength(60);
            expect(users[0].password).toMatch(/^\$2b\$\d+\$/);
        });

        it('should return a 400 error when a user tries to register with an existing email', async () => {
            const user = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            const userRepository = connection.getRepository('User');
            await userRepository.save({ ...user, role: Roles.CUSTOMER });
            const response = await request(app)
                .post('/auth/register')
                .send(user);
            expect(response.statusCode).toBe(400);
        });
    });

    describe('Fields are missing', () => {
        it('should return 400 when email is missing', async () => {
            const user = {
                username: 'testuser',
                email: '',
                password: 'password123',
            };
            const response = await request(app)
                .post('/auth/register')
                .send(user);
            expect(response.statusCode).toBe(400);
            const userRepository = connection.getRepository('User');
            const users = await userRepository.find();
            expect(users).toHaveLength(0);
        });
    });

    describe('All fields are given but structure is not correct', () => {
        it('Should trim the email and make it correct', async () => {
            const user = {
                username: 'testuser',
                email: ' testuser@example.com ',
                password: 'password123',
            };
            const response = await request(app)
                .post('/auth/register')
                .send(user);
            expect(response.statusCode).toBe(201);
            const userRepository = connection.getRepository('User');
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0].email).toBe('testuser@example.com');
        });

        it('Should check email is is valid email', async () => {
            const user = {
                username: 'testuser',
                email: 'invalidemail',
                password: 'password123',
            };
            const response = await request(app)
                .post('/auth/register')
                .send(user);
            expect(response.statusCode).toBe(400);
        });
    });

    describe('Return tokens', () => {
        it('should return access token and refresh token in the response cookies', async () => {
            const user = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            const response = await request(app)
                .post('/auth/register')
                .send(user);

            const cookies = response.headers['set-cookie'] || [];

            let accessTokenCookie: string | null = null;
            let refreshTokenCookie: string | null = null;

            for (const cookie of cookies) {
                if (cookie.startsWith('accessToken=')) {
                    accessTokenCookie = cookie.split(';')[0].split('=')[1];
                }

                if (cookie.startsWith('refreshToken=')) {
                    refreshTokenCookie = cookie.split(';')[0].split('=')[1];
                }
            }
            expect(accessTokenCookie).not.toBeNull();
            expect(refreshTokenCookie).not.toBeNull();
            expect(isJWT(accessTokenCookie)).toBeTruthy();
            expect(isJWT(refreshTokenCookie)).toBeTruthy();
        });

        it('should store the refresh token in the database', async () => {
            const user = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            const response = await request(app)
                .post('/auth/register')
                .send(user);
            const refreshTokenRepository =
                connection.getRepository('RefreshToken');
            // const refreshTokens = await refreshTokenRepository.find();
            // expect(refreshTokens.length).toBe(1);
            const token = await refreshTokenRepository
                .createQueryBuilder('refreshToken')
                .where('refreshToken.userId = :userId', {
                    userId: (response.body as Record<string, string>).id,
                })
                .getMany();
            expect(token.length).toBe(1);
        });
    });
});
