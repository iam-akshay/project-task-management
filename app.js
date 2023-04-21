const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
require('dotenv').config()
const projectsRouter = require('./routes/projects');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/projects', projectsRouter)
app.use('/auth', authRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});


require("./config");

app.listen(3000, () => {
  logger('App started at port 3000...')
  console.log("App started at port 3000...")
})  