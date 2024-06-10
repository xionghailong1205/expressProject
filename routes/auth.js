var express = require('express');
var router = express.Router();
const a = require("../app")
const { getStore } = require('../utils/createSessionStore')

const store = getStore()

router.get("/getSessionInfo", (req, res) => {
    res.send(req.session.userName)
})

router.get('/setUserName', (req, res) => {
    req.session.userName = "xionghailong"
    res.send("设置成功")
})

router.get('/destroySession', (req, res) => {
    req.session.destroy();
    res.send("销毁成功")
})

router.get('/viewStore', function (req, res) {
    console.log(store)
    res.send("简单测试")
})

module.exports = router;