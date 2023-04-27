const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    title: String,
    data: {
        type: Object,
        required: true,
        validate: {
            validator: (value) => {
                const valid_keys = ['text', 'image'];
                return Object.keys(value).every((v) => valid_keys.includes(v));
            },
            message: `Key must be: ${['text', 'image'].join(', ')}`
        }
    },
    createdBy: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
        required: true,
        index: true
    },
    annotations: [mongoose.Schema.Types.Mixed]
}, { timestamps: true });

const TasksModel = mongoose.model('tasks', tasksSchema);

module.exports = TasksModel;