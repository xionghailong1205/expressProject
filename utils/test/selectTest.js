const { getdb, createdb } = require("../createdb");

createdb()
const db = getdb()

db.query(`SELECT users.*, volunteerOrganizations.org_name FROM users INNER JOIN volunteerOrganizations ON users.memberof = volunteerOrganizations.org_id WHERE users.user_email = "xionghailongk@icloud.com"`, async (err, results) => {
    if (err) {
        console.log(err)
        // return res.status(500).json({ error: err.message });
    }

    console.log(results)
    db.end((err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("关闭成功")
    })
});