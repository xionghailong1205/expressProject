var express = require('express');
var router = express.Router();
var session = require('express-session');
const a = require("../app");
const { getdb } = require('../utils/createdb');
const { comparePassword, hashPassowrd } = require('../utils/hashPassword');

router.post('/handleLogin', function (req, res) {
    const { email, password } = req.body
    const role = req.query.role ?? "user"

    if (!email || !password) {
        res.send("incorrect request")
        return
    }

    const db = getdb()

    switch (role) {
        case "user": {
            db.query(`select user_password, user_name, memberof from users where user_email = "${email}";`, async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (results.length === 0) {
                    res.json({ error: "account does not exist." })
                } else {
                    const hashInDB = results[0].user_password
                    const name = results[0].user_name
                    const orgId = results[0].memberof
                    console.log("orgId", orgId)
                    const passwordCorrect = await comparePassword(password, hashInDB)
                    if (passwordCorrect) {
                        // 如果密码正确, 我们设置 session 同时进行跳转
                        req.session.email = email
                        req.session.name = name
                        req.session.role = role
                        res.cookie('name', name)
                        res.cookie('role', role)
                        if (orgId) {
                            req.session.orgId = orgId
                            res.cookie('orgId', orgId)
                        }
                        res.json({ result: "login as user" })
                    } else {
                        res.json({ error: "wrong password" })
                    }
                }
            });
            break
        }
        case "manager": {
            db.query(`select manager_password, manager_name, managerof  from managers where manager_email = "${email}";`, async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (results.length === 0) {
                    res.json({ error: "account does not exist." })
                } else {
                    const hashInDB = results[0].manager_password
                    const name = results[0].manager_name
                    const orgId = results[0].managerof
                    const passwordCorrect = await comparePassword(password, hashInDB)
                    if (passwordCorrect) {
                        // 如果密码正确, 我们设置 session 同时进行跳转
                        req.session.email = email
                        req.session.name = name
                        req.session.role = role
                        req.session.orgId = orgId
                        res.cookie('name', name)
                        res.cookie('role', role)
                        res.cookie('orgId', orgId)
                        res.json({ result: "log in successful" })
                    } else {
                        res.json({ error: "wrong password" })
                    }
                }
            });
            break
        }
        case "admin": {
            db.query(`select admin_password, admin_name from admins where admin_email = "${email}";`, async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (results.length === 0) {
                    res.json({ error: "account does not exist." })
                } else {
                    const hashInDB = results[0].admin_password
                    const name = results[0].admin_name
                    const passwordCorrect = await comparePassword(password, hashInDB)
                    if (passwordCorrect) {
                        // 如果密码正确, 我们设置 session 同时进行跳转
                        req.session.email = email
                        req.session.name = name
                        req.session.role = role
                        res.cookie('name', name)
                        res.cookie('role', role)
                        res.json({ result: "log in successful" })
                    } else {
                        res.json({ error: "wrong password" })
                    }
                }
            });
            break
        }
        default: {
            res.send("还未编写相关处理代码.")
        }
    }
})

router.post('/handleSignup', async function (req, res) {
    const { email, name, password, orgId } = req.body
    const role = req.query.role ?? "user"

    if (!email || !password || !name) {
        res.send("incorrect request")
        return
    }

    const db = getdb()

    const hashedPassword = await hashPassowrd(password)

    switch (role) {
        case "user": {
            db.query(`INSERT INTO users (user_name, user_email, user_password) VALUES ("${name}","${email}","${hashedPassword}");`, async (err, results) => {
                if (err) {
                    // 处理重复注册的问题
                    const errorCode = err.code
                    switch (errorCode) {
                        case "ER_DUP_ENTRY": {
                            res.json({ error: "account already existed" })
                            return
                        }
                    }
                }

                res.json({ result: "sign up successful" })
            });
            break
        }
        case "manager": {
            db.query(`
            INSERT INTO
                managers (
                    manager_name,
                    manager_email,
                    manager_password,
                    managerof
                )
            VALUES
                (
                    "${name}",
                    "${email}",
                    "${hashedPassword}",
                    ${orgId}
                );`, async (err, results) => {
                if (err) {
                    // 处理重复注册的问题
                    const errorCode = err.code
                    switch (errorCode) {
                        case "ER_DUP_ENTRY": {
                            res.json({ error: "account already existed" })
                            return
                        }
                    }
                }

                res.json({ result: "sign up successful" })
            });
            break
        }
        default: {
            res.send("还未编写相关处理代码.")
        }
    }

})

router.post('handleCreateNewAdmin', (req, res) => {
    res.send("我们之后会编写这个接口.")
})

router.use('/handleLogout', function (req, res) {
    req.session.destroy();
    res.clearCookie('name', { path: "/" });
    res.clearCookie('role', { path: "/" });
    res.clearCookie('orgId', { path: "/" });
    res.clearCookie('connect.sid', { path: "/" });
    res.redirect('/')
})

module.exports = router;