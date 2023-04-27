const TasksModel = require('../models/tasks')

const createTaskService = async (data) => {
    const task = await TasksModel(data)
    await task.save()
    return task
}

const getTaskService = async (projectId) => {
    const tasks = await TasksModel.find({ projectId });
    return tasks;
}

module.exports = {
    createTaskService,
    getTaskService
};