const knexLogger = require('knex-logger');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(knexLogger(app.db));
    app.use(bodyParser.json());
};
