var express = require('express');
const { getdb } = require('../utils/createdb');
var router = express.Router();
var path = require('path');

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

router.get('/newUpdate', (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "user"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/user/newUpdate.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get('/newEvent', (req, res) => {
    const hasLogin = req.session.email
    const isManger = req.session.role === "user"
    if (hasLogin && isManger) {
        res.sendFile(path.join(process.cwd(), "public/user/newEvent.html"))
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.get('/getUserProfileData', (req, res) => {
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

router.post('/updateUserProfile', (req, res) => {
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

router.get('/getRVSPedEventList', (req, res) => {
    const db = getdb()
    const userEmail = req.session.email ?? "xionghailongk@icloud.com"

    if (userEmail) {
        db.query(`
                SELECT
                    events.event_title
                FROM
                    rvsp
                INNER JOIN events ON rvsp.rvsp_of = events.event_title
                WHERE
                    rvsp.rvsp_maker = "${userEmail}"
            `, async (err, results) => {
            if (err) {
                console.log(err)
                res.json({
                    error: "something wrong"
                })
            }

            const hasRVSPEventList = results.map(eventInfo => {
                return ({
                    eventName: eventInfo.event_title
                })
            })

            res.json(hasRVSPEventList)
        });
    } else {
        res.status(401).send('Unauthorized');
    }
})

router.post('/doRVSP', (req, res) => {
    const {
        eventName
    } = req.body

    const userEmail = req.session.email

    const db = getdb()

    db.query(`
        INSERT INTO
            rvsp (rvsp_maker, rvsp_of)
        VALUES
            ("${userEmail}", "${eventName}");
    `, async (err, results) => {
        if (err) {
            console.log(err)
            res.json({
                error: "something wrong"
            })
        }

        res.json({
            result: "RVSP successful"
        })
    });

})

module.exports = router;