import request from 'supertest';
import app from '../src/app';

describe('User Registration', () => {
    describe('happy path', () => {
        it('should register a user successfully', async () => {
            const response = await request(app).post('/auth/register').send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            });
            expect(response.status).toBe(201);
        });
    });
    describe('happy path', () => {
        it('should return valid json response', async () => {
            const response = await request(app).post('/auth/register').send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            });
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('application/json'),
            );
        });
    });
    describe('unhappy path', () => {});
});
