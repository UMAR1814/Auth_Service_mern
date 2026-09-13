import { calculateDiscount } from './src/utils';
import app from './src/app';
import request from 'supertest';

describe('app', () => {
    it('should calculate the correct discount', () => {
        const price = 100;
        const discount = 10;
        const expectedDiscountedPrice = 10;

        const actualDiscountedPrice = calculateDiscount(price, discount);
        expect(actualDiscountedPrice).toBe(expectedDiscountedPrice);
    });

    it('should return 200 status code for a successful request', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
