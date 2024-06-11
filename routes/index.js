const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
var path = require('path');
const { getdb } = require('../utils/createdb');
const dayjs = require('dayjs');

router.get('/', (req, res) => {
    const hasLogin = req.session.email
    const role = req.session.role
    if (hasLogin) {
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

router.get('/getPublicUpdateList', (req, res) => {
    const db = getdb()
    const orgId = req.query.orgId

    db.query(`
            SELECT
                updates.update_content,
                updates.update_accessibility,
                updates.create_at,
                managers.manager_name
            FROM
                updates
            INNER JOIN managers ON updates.createby = managers.manager_email
            WHERE
                managers.managerof = ${orgId} and updates.update_accessibility = "public"
        `, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        const updateList = results.map((updateInfo) => {
            return ({
                updateContent: updateInfo.update_content,
                updateAccessibility: updateInfo.update_accessibility,
                createAt: updateInfo.create_at,
                createAt: dayjs(updateInfo.create_at).format('YYYY-MM-DD'),
                creater: updateInfo.manager_name
            })
        })

        res.json(updateList)
    });
})

router.get('/publicUpdateListOfOrg', (req, res) => {
    const orgId = req.query
    if (orgId) {
        if (req.session.email) {
            res.sendFile(path.join(process.cwd(), "public/user/publicUpdate.html"))
        } else {
            res.sendFile(path.join(process.cwd(), "public/publicUpdate.html"))
        }
    } else {
        res.redirect('/')
    }
})


module.exports = router;