const request = require('supertest');

const app = require('../src/app');

test('Stay in raiz', () => {
    return request(app).get('/')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});