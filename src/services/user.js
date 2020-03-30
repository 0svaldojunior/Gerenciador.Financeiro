const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
    const findAll = () => {
        return app.db('users').select(['id', 'name', 'email']);
    };

    const findOne = (filter = {}) => {
        return app.db('users').where(filter).first();
    };

    const getPasswdHash = (passwd) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(passwd ,salt);
    };

    const save = async (user) => {
        if(!user.name) throw new ValidationError('Name is a required attribute');
        if(!user.email) throw new ValidationError('Email is a required attribute');
        if(!user.passwd) throw new ValidationError('Password is a required attribute');

        const userDb = await findOne({ email: user.email });
        if(userDb) throw new ValidationError('This email already exits');
        
        const newUser = { ...user };
        newUser.passwd = getPasswdHash(user.passwd);
        return app.db('users').insert(newUser, ['id', 'name', 'email']);
    };

    return { findAll, save, findOne };
};