// Import necessary modules for testing
const request = require('supertest');
const app = require('../../src/config/app'); // Adjust the path as necessary
const { connectDB, disconnectDB } = require('../../src/config/database'); // Adjust the path as necessary

// Connect to the database before running tests
beforeAll(async () => {
    await connectDB();
});

// Disconnect from the database after tests are complete
afterAll(async () => {
    await disconnectDB();
});

// Test suite for API endpoints
describe('API Endpoints', () => {
    let userId1, userId2;

    // Create users for testing
    beforeEach(async () => {
        const user1Response = await request(app)
            .post('/api/users/register')
            .send({
                name: 'John Doe',
                age: 28,
                gender: 'Male',
                country: 'USA',
                ethnicity: 'Caucasian',
                hobbies: ['hiking', 'reading'],
                activities: ['traveling', 'photography']
            });
        userId1 = user1Response.body.userId;

        const user2Response = await request(app)
            .post('/api/users/register')
            .send({
                name: 'Jane Smith',
                age: 26,
                gender: 'Female',
                country: 'USA',
                ethnicity: 'Caucasian',
                hobbies: ['reading', 'cooking'],
                activities: ['traveling', 'painting']
            });
        userId2 = user2Response.body.userId;
    });

    // Test user registration
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                name: 'Alice',
                age: 30,
                gender: 'Female',
                country: 'Canada',
                ethnicity: 'Asian',
                hobbies: ['dancing', 'cooking'],
                activities: ['traveling', 'swimming']
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('userId');
    });

    // Test finding matches
    it('should find matches by country', async () => {
        const response = await request(app)
            .get(`/api/matches/${userId1}/country/USA`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test creating a chat
    it('should create a chat between two users', async () => {
        const response = await request(app)
            .post(`/api/chats`)
            .send({ userIdA: userId1, userIdB: userId2 });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('chatId');
        expect(response.body.participants).toHaveLength(2);
    });

    // Test reporting a user
    it('should report a user', async () => {
        const response = await request(app)
            .post(`/api/reports`)
            .send({ reporterId: userId1, offenderId: userId2, reason: 'Inappropriate behavior' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User reported successfully');
    });
});