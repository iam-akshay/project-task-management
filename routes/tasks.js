const express = require('express');
const { createTaskController, getTasksController } = require('../controllers/tasks');
const router = express.Router();

router.post('/:projectId/tasks', createTaskController);
router.get('/:projectId/tasks', getTasksController);

module.exports = router