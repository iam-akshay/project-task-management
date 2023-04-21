const { createProjectService } = require('../services/projects');

const createProjectController = async (req, res, next) => {
    const { name, description } = req.body;

    try {
        const project = await createProjectService({
            name,
            description
        });
        res.status(201).send({
            'message': 'Project created successfully',
            'project': project
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProjectController
}