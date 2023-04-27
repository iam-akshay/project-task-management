const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const { validateToken } = require('./controllers/auth')

require('./config');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/auth', authRouter);

// middlewaer: use to authenticate a user
app.use("/api", validateToken);
app.use('/api/projects', tasksRouter);
app.use('/api/projects', projectsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err.message);
});



app.listen(3000, () => {
    logger('App started at port 3000...');
    console.log('App started at port 3000...');
});  