//轮播图路由
import express from "express";
import RollModel from "../model/roll";
import formidable from "formidable";
import path from "path";
import configs from '../config.js'
const router = express.Router();


//post路由1


//修改操作的路由

router.post("/edit/:id", (req, res, next) => {
    const {body} = req;
    // console.log(body.id, "edit");
    RollModel.findById(req.params.id, (err, docs) => {
        if (err) {return next(err);}
        // console.log(docs);
        Object.keys(body).map(key => (
            docs[key] = body[key]
        ));
        docs.l_edit = new Date().toLocaleString();
        docs.save();
        res.json(docs);
    });
    // res.end('ok')
});


//删除路由
router.get("/remove/:id", (req, res, next) => {
    RollModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) {return next(err);}
        res.json(docs);
    });
});


//添加图片路由11
router.post("/add", (req, res, next) => {
    // 1  ++++无file的post请求！

    // console.log(req.body, "add");
    // const {img_title, img_link, img_url, createdAt} = req.body;

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
    //     l_edit: new Date().toLocaleString(),
    //     img_title, img_link, img_url, createdAt
    // });
    //
    // img.save((err, data) => {
    //     if (err) {
    //         next(err);
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


    // 2   +++++++有file的POST请求： ++++

    //拿到post的数据流，用formidable插件
    // 创建实例
    const form = new formidable.IncomingForm();
    //指定文件存储地址
    form.uploadDir =  configs.uploadImgPath;
    //文件的格式不变
    form.keepExtensions = true;
    //解析req的数据1
    // console.log(req,'req');
    form.parse(req, (err, fields, files) => {  //上传好图片了，这时候！
        if (err) {
            return next(err);
        }
        console.log(222, files, fields, 222);


        //图片上传了，拿到了图片路径，然后再存储数据库图片的信息数据1
        const {path} = files.img_url;
        const arr = path.split("public");
        fields.img_url = arr[arr.length - 1];

        const img = new RollModel(fields);

        img.save((e, data) => {
            if (e) {return next(e);}
            res.json(data);
        });
    });


});


export default router;