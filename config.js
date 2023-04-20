const mongoose = require('mongoose');
const logger = require('morgan');

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    logger("Database connected successfully!")
}).catch(() => {
    logger("Error occurred while connecting database!")
})