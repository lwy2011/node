import express from "express";
import User from "../model/user.js";
import md5 from "blueimp-md5";
import {user_md5_key} from "../config.js";
import formidable from "formidable";
import config from "../config";
import path from "path";

const router = express.Router();


// const s_key = "@#@%$#WEEWWR322dssdaE3$Gs";
router.post("/add", (req, res, next) => {
    // console.log(req.body);
    const {body} = req;
    body.l_edit = new Date().toLocaleString();
    body.password = md5(body.password + user_md5_key);
    const user = new User(body);
    user.save((e, docs) => {
        if (e) {return next(e);}
        res.json(docs);
    });
});

router.post("/login", (req, res, next) => {
    const {username, password} = req.body;
    console.log(username, password, req.session);
    User.findOne({username}, (e, docs) => {
        if (e) {return next(e);}
        if (docs) {
            if (docs.password === password) {

                //添加session的token，值为用户的数据的id，并存到数据库
                req.session.token = docs.id;

                res.json({
                    status: 200,
                    result: "登陆成功！",
                    token: docs.id    //token值！
                });
            } else {
                res.json({
                    status: 1,
                    result: "密码错误！",
                });
            }
        } else {
            res.json({
                status: 2,
                result: "用户名不存在！",
            });
        }
    });
});
//edit

router.post("/edit/:id", (req, res, next) => {
    const {id} = req.params;
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = config.uploadAvatarPath;
    form.parse(req, (e, fields, files) => {
        if (e) return next(e);
        console.log(fields, files);
        const {avatar} = files;
        avatar && avatar.size && (
            fields.avatar = config.uploadAvatarPathHelper + path.basename(files.avatar.path)
        );
        User.findById(id, (err, user) => {
            if (err) return next(e);
            Object.keys(fields).map(key => user[key] = fields[key]);
            user.l_edit = new Date().toLocaleString();
            user.save((e, docs) => {
                if (e) return next(e);
                res.json({
                    status: 200,
                    result: docs
                });
            });
        });
    });
});

router.post("/reset_pwd/:id", (req, res, next) => {
    const {new_pwd, old_pwd} = req.body;
    User.findById(req.params.id, (err, user) => {
        console.log(req.params.id,old_pwd,new_pwd);
        if (err) return next(err);
        if (user.password !== old_pwd) return res.json({
            status: 1, message: "原始密码输入错误！"
        });
        user.password = new_pwd;
        user.save((e) => {
            if (e) return next(e);
            res.json({
                status: 200,
                message: "密码修改成功！"
            });
        });
    });

});

router.get("/quit", (req, res, next) => {
    console.log("quit", req.session);
    // req.session.cookie.maxAge = 0;
    req.session.destroy(e => {
        if (e) return next(e);
        res.json({
            status: 200,
            result: "退出登录成功！"
        });
        console.log(res.session, "end");
    });

});
export default router;