const { getdb, createdb } = require("../createdb");

createdb()
const db = getdb()

db.query(`SELECT users.*, volunteerOrganizations.org_name FROM users INNER JOIN volunteerOrganizations ON users.memberof = volunteerOrganizations.org_id WHERE users.user_id = 2`, async (err, results) => {
    if (err) {
        // 处理重复注册的问题
        // console.log(err)
        const errorCode = err.code
        switch (errorCode) {
            case "ER_DUP_ENTRY": {
                console.log("账号已经存在")
            }
        }
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