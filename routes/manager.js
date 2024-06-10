var express = require('express');
const { getdb } = require('../utils/createdb');
var router = express.Router();
var path = require('path');
const dayjs = require('dayjs')

// 我们最后的工作是完善这里的中间件
// router.use((req, res, next) => {
//     if (!req.session.user) {
//         res.send("incorrect request")
//         return
//     }
//     next()
// })

router.get('/profile', (req, res) => {
    const hasLogin = req.session.email
    if (hasLogin) {
        res.sendFile(path.join(process.cwd(), "public/user/userProfile.html"))
    } else {
        // res.sendFile(path.join(process.cwd(), "public/organizationList.html"))
        res.redirect("/")
    }
})

router.get('/createUpdate', (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "manager"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/manager/createUpdate.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get('/createEvent', (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "manager"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/manager/createEvent.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get('/memberList', (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "manager"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/manager/memberList.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get('/viewEvents', (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "manager"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/manager/eventList.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get("/eventList", (req, res) => {
    const db = getdb()
    const orgId = req.session.orgId

    if (!orgId) {
        res.json({ error: "Has not join in organization now." })
        return
    }

    db.query(`SELECT events.event_title, events.event_content, events.event_content, events.update_at, events.open_time, events.close_time, managers.manager_name
    FROM
        events
        INNER JOIN managers ON events.createby = managers.manager_email
    WHERE
        managers.managerof = ${orgId}`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        const eventList = results.map((eventInfo) => {
            return ({
                eventTitle: eventInfo.event_title,
                eventContent: eventInfo.event_content,
                updateAt: dayjs(eventInfo.update_at).format('YYYY-MM-DD'),
                startTime: dayjs(eventInfo.open_time).format('YYYY-MM-DD'),
                endTime: dayjs(eventInfo.close_time).format('YYYY-MM-DD'),
                creater: eventInfo.manager_name
            })
        })

        console.log(eventList)

        res.json(eventList)
    });
})

router.post('/createEvent', (req, res) => {
    const db = getdb()
    const managerEmail = req.session.email ?? "xionghailong1@icloud.com"

    const {
        eventTitle,
        eventContent,
        startTime,
        endTime,
    } = req.body

    if (!eventTitle || !eventContent || !startTime || !endTime) {
        res.send("incorrect request")
        return
    }

    db.query(`INSERT INTO events (event_title, event_content, open_time, close_time, createby) VALUES
    (
        "${eventTitle}",
        "${eventContent}",
        "${startTime}",
        "${endTime}",
        "${managerEmail}"
    );`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
            return
        }

        console.log(results)
        res.json({ result: "ceate successful" })
    })
})

router.post('/createUpdate', (req, res) => {
    const db = getdb()
    const managerEmail = req.session.email ?? "xionghailong1@icloud.com"

    const {
        updateContent,
        updateAccessibility,
    } = req.body

    if (!updateContent || !updateAccessibility) {
        res.send("incorrect request")
        return
    }

    db.query(`INSERT INTO updates (update_content, update_accessibility, createby)
    VALUES
    ("${updateContent}", "${updateAccessibility}", "${managerEmail}");`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
            return
        }

        console.log(results)
        res.json({ result: "ceate successful" })
    })
})

router.get('/getUserList', (req, res) => {
    const db = getdb()
    const orgId = req.session.orgId

    db.query(`select * from users where memberof = ${orgId};`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        const userList = results.map((userInfo) => {
            return ({
                name: userInfo.user_name,
                email: userInfo.user_email,
                number: userInfo.user_phonenumber,
                address: userInfo.user_address
            })
        })

        res.json(userList)
    });
})

router.get('/getManagerProfileData', (req, res) => {
    const db = getdb()
    const user_email = req.session.email ?? "xionghailongk@icloud.com"

    db.query(`SELECT users.*, volunteerOrganizations.org_name FROM users INNER JOIN volunteerOrganizations ON users.memberof = volunteerOrganizations.org_id WHERE users.user_email = "${user_email}"`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        const userInfo = results[0]

        console.log(userInfo)

        res.json({
            data: {
                name: userInfo.user_name,
                email: userInfo.user_email,
                organization: userInfo.org_name ?? "",
                number: userInfo.user_phonenumber ?? "",
                address: userInfo.user_address ?? ""
            }
        })
    });
})

router.post('/updateMangerProfile', (req, res) => {
    const db = getdb()
    const user_email = req.session.email ?? "xionghailongk@icloud.com"

    const {
        newName,
        newNumber,
        newAddress
    } = req.body

    db.query(`UPDATE users SET user_name = "${newName}",user_phonenumber = "${newNumber}",user_address = "${newAddress}" WHERE user_email = "${user_email}";`, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({ error: "something wrong" })
        }

        console.log(results)
        res.json({ result: "update successful" })
    });
})

router.get('/getUpdateList', (req, res) => {
    const db = getdb()
    const orgId = req.session.orgId
    console.log(orgId)

    if (!orgId) {
        res.json({ error: "Has not join in organization now." })
        return
    }

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
                managers.managerof = ${orgId}
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

router.get('/RVSPedMemberListOfEvent', (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "manager"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/manager/RVSPedMemberListOfEvent.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get('/getRVSPedMemberListOfEvent', (req, res) => {
    const db = getdb()

    const eventName = req.query.eventName

    db.query(`
        SELECT
            rvsp.rvsp_maker,
            rvsp.rvsp_createat,
            users.user_name,
            users.user_phonenumber
    FROM
        rvsp
        INNER JOIN users ON rvsp.rvsp_maker = users.user_email
        WHERE
            rvsp.rvsp_of = "${eventName}"
    `, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        const RVSPMemberList = results.map((memberInfo) => {
            return ({
                name: memberInfo.user_name,
                email: memberInfo.rvsp_maker,
                number: memberInfo.user_phonenumber,
                rvspAt: dayjs(memberInfo.rvsp_createat).format('YYYY-MM-DD'),
            })
        })

        res.json(RVSPMemberList)
    });
})

module.exports = router;