import express from "express";
import User from "../model/user.js";
import configs from "../config.js";

const router = express.Router();

router.get("/back/login", (req, res) => {
    res.render("back/login.html", {key: configs.user_md5_key});
});
router.get("/back/register", (req, res) => {
    res.render("back/register.html");
});
router.get("/back/user_center/:id", (req, res, next) => {
    User.findById(req.params.id, (e, user) => {
        if (e) {return next(e);}
        user && res.render("back/user_center.html", {data: user});
        if (!user) {
            req.session.cookie.maxAge = 0;
        }
    });
});
router.get("/back/user_reset_pwd/:id", (req, res) => {
    res.render("back/user_reset_pwd.html");
});
router.get("/back/user/edit/:id", (req, res, next) => {
    const {id} = req.params;
    User.findById(id, (e, user) => {
        if (e) return next(e);
        res.render('back/user_edit.html',{data:user})
    });
});
export default router;