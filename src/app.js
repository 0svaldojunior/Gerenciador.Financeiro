const app = require('express')();
const consign = require('consign');
const knex = require('knex');

const knexfile = require('../knexfile');

app.db = knex(knexfile.test);

app.get('/users', (request, response) => {
    response.status(200).send();
})

consign({ cwd: 'src', verbose: false })
    .include('./config/middlewares.js')
    .then('./services')
    .then('./routes')
    .then('./config/routes.js')
    .into(app);

app.get('/', (request, response) => {
    response.status(200).send();
});

app.use((err, request, response, next) => {
    const { name, message, stack } = err;
    if( name === 'ValidationError' ) response.status(400).json({ error: message });
    else res.status(500).json({ name, message, stack });
    next(err);
});

// app.db.on('query', (query) => {
//     console.log({
//         sql: query.sql,
//         bindings: query.bindings ? query.bindings.join(',') : ''
//     });
// })
//     .on('query-response', response => console.log(response))
//     .on('error', error => console.log(error));

module.exports = app;
