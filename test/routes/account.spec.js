const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;
const dateNow = Date.now();
const userName = `${dateNow} User`;
const mail = `${dateNow}@mail.dev`;
const accountNumber = `Account #${dateNow}`;

beforeAll(async () => {
    const res = await app.services.user.save(
        {
             name:  userName,
             email: mail,
             passwd: '123456'
        }
    );
    user = { ...res[0] };
});

test('Account insertion sucessefull', () => {
    return request(app).post(MAIN_ROUTE)
    .send(
        {
            name: accountNumber,
            user_id: user.id
        }
    )
    .then((result) => {
        expect(result.status).toBe(201);
        expect(result.body.name).toBe(accountNumber);
    });
});

test.skip('Duplicate accounts for the same user forbidden', () => { });

test('Don\'t count without a name', () => {
    return request(app).post(MAIN_ROUTE)
    .send({ user_id: user.id })
    .then((result) => {
        expect(result.status).toBe(400);
        expect(result.body.error).toBe('Name is mandatory attribute');
    });
});

test.skip('List user accounts only', () => { });

test('List all accounts', () => {
    return app.db('accounts')
        .insert(
            {
                name: 'Acc list',
                user_id: user.id
            }
        )
        .then(() => request(app).get(MAIN_ROUTE))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    
});

test.skip('Forbidden to return another user\'s account', () => { });

test('One account for ID', () => {
    return app.db('accounts')
        .insert(
            {
                name: 'Acc by Id',
                user_id: user.id
            }, ['id']
            )
        .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Acc by Id');
            expect(res.body.user_id).toBe(user.id);
        });
});

test.skip('Forbidden to change another user\'s account', () => { });

test('Chage account', () => {
    return app.db('accounts')
        .insert(
            {
                name: 'Acc To Update',
                user_id: user.id
            }, ['id']
            )
        .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
            .send({ name: 'Acc Updated' }))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Acc Updated');
        });
});

test.skip('Forbidden to delete another user\'s account', () => { });

test('Delete one accoutn', () => {
    return app.db('accounts')
        .insert(
            {
                name: 'Acc to delete',
                user_id: user.id
            }, ['id']
        )
        .then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
        .then((res) => {
            expect(res.status).toBe(204);
        });
});