var express = require('express');
const { getdb } = require('../utils/createdb');
var router = express.Router();
var path = require('path');
const dayjs = require('dayjs');
const { hashPassowrd } = require('../utils/hashPassword');

router.get("/getUserList", (req, res) => {
    const db = getdb()

    db.query(`select * from users;`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        const userList = results.map((userInfo) => {
            return ({
                id: userInfo.user_phonenumber,
                name: userInfo.user_name,
                email: userInfo.user_email,
                creaetAt: dayjs(userInfo.created_at).format('YYYY-MM-DD')
            })
        })

        res.json(userList)
    });
})

router.get("/getOrgList", (req, res) => {
    const db = getdb()

    db.query(`select * from volunteerOrganizations;`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        const orgList = results.map((orgInfo) => {
            return ({
                id: orgInfo.org_id,
                name: orgInfo.org_name,
                email: orgInfo.org_email,
                branchof: orgInfo.branchof
            })
        })

        res.json(orgList)
    });
})

router.get('/userList', (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "admin"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/admin/userList.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get("/adminProfile", (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "admin"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/admin/adminProfile.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get("/getAdminProfile", (req, res) => {
    const db = getdb()
    const adminEmail = req.session.email ?? "admin"

    db.query(`select * from admins where admin_email = "${adminEmail}";`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        const userList = results.map((userInfo) => {
            return ({
                name: userInfo.admin_name,
                email: userInfo.admin_email,
                number: userInfo.admin_number,
            })
        })

        res.json(userList)
    });
})

router.get("/addNewAdmin", (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "admin"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/admin/addNewAdmin.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.post('/addNewAdmin', async (req, res) => {
    const { email, name, password } = req.body

    if (!email || !password || !name) {
        res.send("incorrect request")
        return
    }

    const db = getdb()

    const hashedPassword = await hashPassowrd(password)
    db.query(`
        INSERT INTO
            admins (admin_email, admin_name, admin_password)
        VALUES
            (
                "${email}",
                "${name}",
                "${hashedPassword}"
            );`,
        async (err, results) => {
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

            res.json({ result: "Add new Admin successful" })
        });
})

module.exports = router;