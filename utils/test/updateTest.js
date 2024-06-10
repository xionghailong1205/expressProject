const { getdb, createdb } = require("../createdb");

createdb()
const db = getdb()

db.query(`UPDATE users SET user_name = "熊海龙",user_phonenumber = "13584911644",user_address = "熊海龙的家" WHERE user_email = "xionghailongk@icloud.com";`, async (err, results) => {
    if (err) {
        // 处理重复注册的问题
        // console.log(err)
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