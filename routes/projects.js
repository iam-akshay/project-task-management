const express = require('express');
const route = express.Router();

const { createProjectController } = require('../controllers/projects');
const { validateProject } = require('../helpers/projects');


route.post(
    '',
    validateProject,
    createProjectController
);

module.exports = route;