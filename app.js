var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const port = 3000;
var app = express();

app.use('/users/addpost',(req, res, next) => {
    console.log(`POST from a user`);
    next();
});

let countnum=0;
app.use((req, res, next) => {
    countnum++;
    console.log(`Received ${countnum} requests`);
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;
