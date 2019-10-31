import express from "express";
import User from "../model/user.js";
import md5 from "blueimp-md5";
import {user_md5_key} from "../config.js";

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
    console.log(username, password,req.session);
    User.findOne({username}, (e, docs) => {
        if (e) {return next(e);}
        if(docs){
            if( docs.password === password){
                res.json({
                    status:200,
                    result:'登陆成功！',
                    token : docs.id    //tocken值！
                })
            }else {
                res.json({
                    status:1,
                    result:'密码错误！',
                })
            }
        }else {
            res.json({
                status:2,
                result:'用户名不存在！',
            })
        }
    });
});

export default router;