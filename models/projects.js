const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 64,
        unique: true
    },
    description: {
        type: String,
        maxlength: 300
    },
    settings: {
        type: Object,
        default: { 'is_active': true }
    }
});

const ProjectsModel = mongoose.model('projects', projectsSchema);

module.exports = ProjectsModel;