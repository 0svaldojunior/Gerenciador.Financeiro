module.exports = (app) => {
    const create = (request, response, next) => {
        app.services.account.save(request.body)
            .then((result) => {
                return response.status(201).json(result[0]);
            }).catch(err => next(err));
    };

    const getAll = (request, response, next) => {
        app.services.account.findAll()
            .then(result => response.status(200).json(result))
            .catch(err => next(err));
    };

    const get = (request, response, next) => {
        app.services.account.find({ id: request.params.id })
            .then(result => response.status(200).json(result))
            .catch(err => next(err));
    };

    const update = (request, response, next) => {
        app.services.account.update(request.params.id, request.body)
            .then(result => response.status(200).json(result[0]))
            .catch(err => next(err));
    };

    const remove = (request, response, next) => {
        app.services.account.remove(request.params.id)
            .then(() => response.status(204).send())
            .catch(err => next(err));
    };
    
    return { create, getAll, get, update, remove };
};
