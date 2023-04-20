const ProjectsModel = require('../models/projects');
const { body, validationResult } = require('express-validator');
const createProjectController = async (req, res, next) => {
    const { name, description } = req.body;

    // Check project name existence
    const isProjectExists = await ProjectsModel.exists({ name });
    if (isProjectExists) {
        return res.status(400).send({
            "error": `A project with the name '${name}' already exists!`
        })
    }

    try {
        const project = await new ProjectsModel({
            name,
            description
        })
        await project.save();
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