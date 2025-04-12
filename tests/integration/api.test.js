const request = require('supertest');
const app = require('../../src/config/app');
const mongoose = require('mongoose');

describe('API Integration Tests', () => {
    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.TEST_DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Close the database connection
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                country: 'USA',
                ethnicity: 'Hispanic',
                hobbies: ['reading', 'traveling'],
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
    });

    it('should login a user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should find matches based on preferences', async () => {
        const response = await request(app)
            .get('/api/matches')
            .set('Authorization', `Bearer ${token}`) // Assume token is obtained from login
            .query({ hobbies: ['reading'], ethnicity: 'Hispanic' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.matches)).toBe(true);
    });

    it('should block a user', async () => {
        const response = await request(app)
            .post('/api/users/block')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: 'userIdToBlock' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User blocked successfully');
    });

    it('should report a user for abusive behavior', async () => {
        const response = await request(app)
            .post('/api/reports')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: 'userIdToReport', reason: 'Abusive behavior' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Report submitted successfully');
    });
});