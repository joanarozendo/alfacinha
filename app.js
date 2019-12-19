'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/api/authentication');
const restaurantsRouter = require('./routes/api/restaurants');
const commentRouter = require('./routes/api/comment');
const favoritesRouter = require('./routes/api/favorites');
const userRouter = require('./routes/api/user');

const app = express();

app.use(express.static(join(__dirname, 'client/build')));
app.use(logger('dev'));

//app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15 * 1000,
      sameSite: 'lax',
      httpOnly: true
      //secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use('/api', indexRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/restaurant', restaurantsRouter);
app.use('/api/comment', commentRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/user', userRouter);

app.get('*', (req, res, next) => {
  res.sendFile(join(__dirname, 'client/build/index.html'));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(error.status || 500);
  res.json({
    type: 'error',
    error: {
      message: error.message
    }
  });
});

module.exports = app;
