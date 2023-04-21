const ProjectsModel = require('../models/projects');


const isProjectExists = async (name) => {
    const project = await ProjectsModel.exists({ name });
    if (project)
        throw new Error(`A project with the name '${name}' already exists!`);
};

const createProjectService = async (data) => {
    const project = await new ProjectsModel(data);
    await project.save();
    return project;
};

module.exports = {
    isProjectExists,
    createProjectService
};