module.exports = {
    test: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'passwd',
            database: 'gerenciador',
        },
        migrations: {
            directory: 'src/migrations',
        },
    },
};