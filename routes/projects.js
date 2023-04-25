const express = require('express');
const route = express.Router();

const {
    createProjectController,
    getProjectsController,
    deleteProjectController,
    updateProjectController
} = require('../controllers/projects');
const { validateProject } = require('../helpers/projects');


route.post('', validateProject, createProjectController);

route.get('', getProjectsController);

route.delete('/:projectId', deleteProjectController);

route.put('/:projectId', updateProjectController);

module.exports = route;