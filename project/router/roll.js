//轮播图路由
import express from "express";
import RollModel from "../model/roll";
import formidable from "formidable";
import path from "path";

const router = express.Router();


//前端界面获取
router.get("/back/roll", (req, res, next) => {
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

router.get("/back/roll/add", (req, res) => {
    res.render("back/roll_add.html");
});


//post路由
router.post("/imgs/api/roll/add", (req, res, next) => {
    console.log(req.body);


    //测试数据库的写入

    //第一种创建方法

    // RollModel.create({
    //     img_title: "轮播图测试",
    //     img_url: 'uploads/blog/201312/04/20131204184148_hhXUT.jpeg',
    //     img_link:'http://b-ssl.duitang.com',
    //     createdAt:  new Date(),
    //     l_edit:  new Date()
    // }).then(
    //     data => {
    //         console.log(data);
    //         res.redirect('/back')
    //     }
    // ).catch(
    //     err=>{throw err}
    // )

    //第二种创建方法

    // const img = new RollModel({
    //     img_title: "轮播图测试",
    //     img_url: "uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
    //     img_link: "http://b-ssl.duitang.com",
    //     createdAt: new Date(),
    //     l_edit: new Date()
    // });
    //
    // img.save((err,data) => {
    //     if (err) {
    //         throw err;
    //     }
    //     res.json({
    //         status: 200,
    //         result: "添加图片成功！",
    //         data
    //     });
    // });


    //这是普通形式，获取data
    // var da = ''
    // req.on("data", data => {
    //     da += data
    //     console.log(111, data, 111);
    // });
    // req.on('end',()=>{
    //     console.log(da);
    // })


    //拿到post的数据流，用formidable插件
    //创建实例
    // const form = new formidable.IncomingForm();
    // //指定文件存储地址
    // form.uploadDir = path.join(__dirname, "../data/imgs");
    // //文件的格式不变
    // form.keepExtensions = true;
    // //解析req的数据
    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(222, files, fields, 222);
    //     res.end("ok");
    // });


    const {body} = req;
    try {
        console.log(body.toString);

        // res.end("ok");
    } catch (e) {
        next(e);
    }

});


export default router;