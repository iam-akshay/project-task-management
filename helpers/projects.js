const { body, validationResult } = require('express-validator');
const { isProjectExists } = require('../services/projects')

exports.validateProject = [
    body("name")
        .notEmpty()
        .withMessage("Project name is required")
        .matches(/^[a-zA-Z0-9\-]+$/, "i")
        .withMessage("Project name must contain only letters and numbers")
        .custom((name) => isProjectExists(name)),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ error: error.array() });
        }
        next();
    }
];