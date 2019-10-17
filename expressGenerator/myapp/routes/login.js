var express = require("express");
var router = express.Router();
const dataBase = require("../data/help.js");
/* GET home page. */
router.get("/", (req, res) => {    //跳转失败的原因找到了，就是这里不需要再 'login'作为参数了，默认的参数是'/',二级路由应该才要加参数，，，猜的！
    console.log(1);
    res.render("login_register", {path: "login"});
});


router.post("/", (req, res) => {
    // const {name,password} = req.body
    const test = dataBase.test(req.body)
        if(test === "用户名不存在！" ) return res.render("error", {message: test});
        test? res.redirect("/") : res.render("error", {message: "用户名或密码有误！"});
});
module.exports = router;