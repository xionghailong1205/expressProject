const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err)
            }
            resolve(hash)
        });
    })
}

const comparePassword = async (passwordFromClient, hashInDatabase) => {
    return await new Promise((resolve, reject) => {
        bcrypt.compare(passwordFromClient, hashInDatabase, function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result)
        });
    })
}

// hashPassword("admin").then(result => {
//     console.log(result)
// })

// 返回 布尔值
// comparePassword("qq120505", "$2b$10$FS459cMYYa0l1VVTDTcPbOYF4uf.vr0lZ56XdwizBWw1ibcWMEml2").then(result => {
//     console.log(result)
// })

module.exports.hashPassowrd = hashPassword
module.exports.comparePassword = comparePassword