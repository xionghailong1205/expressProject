const mysql = require('mysql2');
const dbConfig = require("./dbConfig")

let db

const createdb = () => {
    db = mysql.createConnection(dbConfig);

    // 连接到数据库
    db.connect((err) => {
        if (err) {
            console.error('数据库连接错误:', err);
        } else {
            console.log('成功连接到数据库');
        }
    });
}

const getdb = () => {
    return db
}

module.exports.createdb = createdb
module.exports.getdb = getdb