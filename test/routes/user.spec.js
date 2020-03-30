const request = require('supertest');

const app = require('../../src/app');

const dateNow = Date.now();
const mail = `${dateNow}@mail.com`;
const user = `${dateNow} User`;

test('All users list', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(200);
        });
});

test('Insertion sucesseful user', () => {
    return request(app).post('/users')
        .send(
            {
                name: user,
                email: mail,
                passwd: '123456',
            }
        )
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe(user);
            expect(res.body).not.toHaveProperty('passwd');
        });
});

test('Password by bcrypt', async () => {
    const res = await request(app).post('/users')
        .send(
            { 
                name: user,
                email: mail,
                passwd: '123456'
            }
        );
    expect(res.status).toBe(201);

    const { id } = res.body;
    const usrDB = await app.services.user.findOne({ id });
    expect(userDB.passwd).not.toBeUndefined();
    expect(userDB.passwd).not.toBe('123456');
});

test('Don\'t enter unnamed user', () => {
    return request(app).post('/users')
        .send(
            {
                email: 'mail@main.dev',
                passwd: '123456'
            }
        )
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Name is a required attribute');
        });
});

test('Don\'t enter unnamed email', async () => {
    const result = await request(app).post('/users')
        .send(
            {
                name: 'Name',
                passwd: '123456'
            }
        );
        expect(result.status).toBe(400);
        expect(result.body.error).toBe('Email is a required attribute');
});

test('Don\'t enter haved password', (done) => {
    request(app).post('/users')
        .send(
            {
                name: 'Name',
                email: mail
            }
        )
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Password is a required attribute');
            done();
        });
});

test('Don\'t enter a exist email', () => {
    return request(app).post('/users')
        .send(
            {
                name: 'Osvaldo Rodrigues',
                email: mail,
                passwd: '123456',
            }
        )
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('This email already exits');
        });
});