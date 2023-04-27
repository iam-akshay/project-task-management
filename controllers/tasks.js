const { createTaskService, getTaskService } = require('../services/tasks')

const createTaskController = async (req, res, next) => {
    const { title, data, createdBy, annotations } = req.body;
    const { projectId } = req.params;

    const task = await createTaskService({
        title, data, createdBy, projectId, annotations
    });

    return res.status(201).send(task);
}

const getTasksController = async (req, res, next) => {
    const { projectId } = req.params;

    const tasks = await getTaskService(projectId);

    return res.status(201).send(tasks);
}

module.exports = {
    createTaskController,
    getTasksController
}