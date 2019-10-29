//轮播图路由
import express from "express";
import RollModel from "../model/roll";

const router = express.Router();


//前端界面获取
router.get("/", (req, res, next) => {
    RollModel.find({}, null, (err, docs) => {
        if (err) {
            return next(err);
        }
        console.log(docs, "roll");
        res.render("back/roll.html", {lists: docs});
    });
    // const roll = new RollModel({
    //     img_title: "轮播图测试",
    //     img_url: "uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
    //     img_link: "http://b-ssl.duitang.com",
    //     createdAt: new Date(),
    //     l_edit: new Date()
    // });
    // roll.save((err, data) => {
    //     console.log(err || data);
    // });
});

//去编辑界面单独

router.get("/edit/:id", (req, res, next) => {
    RollModel.findById(req.params.id, {"__v": 0, l_edit: 0}, (e, docs) => {
        if (e) {return next(e);}
        console.log(docs, "d");
        res.render('back/roll_edit.html',{data:docs})
    });
});

//获取单个图片1111

router.get("/singer/:id", (req, res, next) => {
    // const {id} = req.params;
    RollModel.findById(req.params.id, {"__v": 0, l_edit: 0}, (e, docs) => {
        if (e) {return next(e);}
        // console.log(docs, "d");
        res.json({
            status: 200,
            result: docs || "null"
        });
    });
});


router.get("/add", (req, res) => {
    res.render("back/roll_add.html");
});





export default router;