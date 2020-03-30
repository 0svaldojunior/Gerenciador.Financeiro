module.exports = (app) => {
    const findAll = (request, response, next) => {
        app.services.user.findAll()
            .then((result) =>{
                response.status(200).json(result);
            })
            .catch(err => next(err));
    };
    
    const create = async (request, response, next) => {
        try {
            const result = await app.services.user.save(request.body);
            return response.status(201).json(result[0]);
        } catch (err) {
            return next(err);
        }
        
    };

    return { findAll, create };
};
