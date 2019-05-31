const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

require('./configs/db.config');

const postsRouter = require('./routes/posts.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);

app.use((req, res, next) => {
  next(createError(404))
})

app.use((error, req, res, next) => {
  console.error(error);  
  res.status(error.status || 500);
  const data = {};

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    data.errors = {}
    Object.keys(error.errors)
      .forEach(field => data.errors[field] = error.errors[field].message)
  }

  data.message = error.message
  res.json(data);
})

module.exports = app;
