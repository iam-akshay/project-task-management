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

const getProjectsService = async ({ filters = {}, fields = {} }) => {
    const projects = await ProjectsModel.find(filters, fields);
    return projects;
}

const deleteProjectsService = async (projectId) => {
    const project = await ProjectsModel.deleteOne({ _id: projectId });
    return project;
}

const updateProjectsService = async (projectId, data) => {
    const project = await ProjectsModel.findByIdAndUpdate(
        projectId,
        data,
        { 'new': true }
    );
    return project;
}

module.exports = {
    isProjectExists,
    createProjectService,
    getProjectsService,
    deleteProjectsService,
    updateProjectsService
};