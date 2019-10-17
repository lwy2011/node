const express = require("express");

const router = express.Router();
const dataBase = require("../data/help.js");

router.get("/", (req, res) => {
    res.render("login_register", {path: "register"});
});
router.post("/", (req, res) => {
    console.log(req.body);
    const {name, password} = req.body;
    if (!name || !password) return res.render("error", {message: "用户名和密码都要填！"});
    const result = dataBase.isReg(req.body);
    if (result) return res.render("error", {message: "用户名已存在！"});
    res.redirect("/login");
});

module.exports = router;