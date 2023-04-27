const mongoose = require('mongoose');
const TasksModel = require('./tasks');

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
    },
    createdBy: {
        type: String,
        required: true
    },
    config: {
        type: String,
        required: true
    }
}, { timestamps: true });

projectsSchema.pre('deleteOne', async function (next) {
    const projectId = this._conditions._id;
    await TasksModel.deleteOne({ projectId: projectId });
    next()
});

const ProjectsModel = mongoose.model('projects', projectsSchema);

module.exports = ProjectsModel;