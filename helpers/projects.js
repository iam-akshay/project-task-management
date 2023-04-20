const { body, validationResult } = require('express-validator');

exports.validateProject = [
    body("name").notEmpty().withMessage("Project name is required"),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ error: error.array() });
        }
        next();
    }
];