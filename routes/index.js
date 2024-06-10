const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', (req, res) => {
    const hasLogin = req.session.email
    const role = req.session.role
    if (hasLogin) {
        res.cookie('name', req.session.name)
        res.cookie('role', role)
        switch (role) {
            case "user": {
                res.sendFile(path.join(process.cwd(), "public/user/organizationList.html"))
                break
            }
            case "manager": {
                res.sendFile(path.join(process.cwd(), "public/manager/memberList.html"))
                break
            }
            case "admin": {
                // admin 首页
                res.sendFile(path.join(process.cwd(), "public/admin/organizationList.html"))
                break
            }
        }
    } else {
        res.sendFile(path.join(process.cwd(), "public/organizationList.html"))
    }
})

router.use('/login', function (req, res, next) {
    req.session.email ? res.redirect("/") : next()
}, express.static('public/login.html'))

router.use('/signup', function (req, res, next) {
    req.session.email ? res.redirect("/") : next()
}, express.static('public/signup.html'))


module.exports = router;