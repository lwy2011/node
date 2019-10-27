//轮播图路由
import express from "express";
import ImgModel from "../model/roll";

const router = express.Router();

router.get("/imgs", (req, res) => {

});


router.post("/imgs/api/roll/add", (req, res) => {
    console.log(req.body);

    //第一种创建方法

    // ImgModel.create({
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

    const img = new ImgModel({
        img_title: "轮播图测试",
        img_url: "uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
        img_link: "http://b-ssl.duitang.com",
        createdAt: new Date(),
        l_edit: new Date()
    });

    img.save((err,data) => {
        if (err) {
            throw err;
        }
        res.json({
            status: 200,
            result: "添加图片成功！",
            data
        });
    });

});


export default router;