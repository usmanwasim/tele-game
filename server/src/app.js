var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var dbConnect = require('./utils/dbConnect.js');

dbConnect();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.send(
        'Welcome to TeleGame Server!'
    );
});
app.get('/ping',function(req,res){
    res.send(
        'pong'
    );
});

module.exports = app;
