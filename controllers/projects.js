const { createProjectService, getProjectsService, deleteProjectsService, updateProjectsService } = require('../services/projects');

const createProjectController = async (req, res, next) => {
    const { name, description, created_by, settings, config } = req.body;

    try {
        const project = await createProjectService({
            name,
            description,
            settings,
            config,
            createdBy: created_by
        });
        res.status(201).send({
            'message': 'Project created successfully',
            'project': project
        });
    } catch (err) {
        next(err);
    }
};

const getProjectsController = async (req, res, next) => {
    const projects = await getProjectsService({
        fields: { '__v': 0 }
    });
    res.status(200).send(projects)
}

const deleteProjectController = async (req, res, next) => {
    const { projectId } = req.params;
    const project = await deleteProjectsService(projectId);
    if (project)
        return res.status(200).send(project);
    return res.status(400).send({ "error": "Project not exists" })
}

const updateProjectController = async (req, res, next) => {
    const { projectId } = req.params;
    const data = req.body;
    const project = await updateProjectsService(projectId, data);
    res.status(201).send(project)
}


module.exports = {
    createProjectController,
    getProjectsController,
    deleteProjectController,
    updateProjectController
};