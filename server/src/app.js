var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { config } = require('dotenv');

var dbConnect = require('./utils/dbConnect.js');
var usersRouter = require('./routes/users/users.js');
var refreshTokenRouter = require('./routes/users/refreshToken.js');
var redisRouter = require('./routes/redis_practice/redis_practice.js');
// const redisClient = require('./utils/redisConnect.js');

config();
dbConnect();
// redisClient.connect();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/users/refreshToken', refreshTokenRouter);
app.use('/redis', redisRouter);

module.exports = app;
