var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { createdb } = require("./utils/createdb")
var session = require('express-session');
const { store } = require('./utils/createSessionStore')

var indexRouter = require('./routes/index');
var organizationRouter = require('./routes/organizationRouter');
var handlePost = require('./routes/handlePost')
var authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const managerRouter = require('./routes/manager')
const adminRouter = require('./routes/admin')

var app = express();

createdb()

app.use('/users/addpost', (req, res, next) => {
    console.log(`POST from a user`);
    next();
});

// 设置 session 中间件
app.use(session({
    secret: 'super_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store
}));

let countnum = 0;

// 一个简单的中间件
app.use((req, res, next) => {
    console.log(req.session.userName)
    next()
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
    dotfiles: 'ignore',
}));

app.use('/', indexRouter)
app.use('/', handlePost)
app.use('/user', userRouter)
app.use('/manager', managerRouter)
app.use('/organization', organizationRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter);

console.log("Server open in:", "http://localhost:8848")

module.exports = app;
module.exports.test = "nihao"
