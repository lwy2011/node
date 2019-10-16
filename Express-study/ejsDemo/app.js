const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const moment = require("moment");
const fs = require("fs");
const app = express();

//为了保存数据，这里需要一个全局变量,整个生命周期的存在
let entries = [];

app.locals.entries = entries;


//配置ejs
app.set("views", "./view");
app.set("view engine", "ejs");


//配置静态文件的获取中间件
app.use(express.static(path.join(__dirname, "view")));


//设置用户表单的提交的数据接收的中间键，所有的提交信息保存在req.body里

app.use(bodyParser.urlencoded({extended: false}));
//extended 这里是数据要不要编码？最好不要！

app.get("/", (req, res) => {
    // fs.readFile(path.join(__dirname, "./data/index.txt"), (err, data) => {
    //     if (err) return res.status(503).render("503", {err: "数据库异常！请稍后再试！"});
    //     const lists = data ? JSON.parse("[" + data.toString() + "]") : "";
    //     console.log(lists);
    //     res.render("index");
    // });
    // console.log(entries);
    return res.render("index",{entries});
});
app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/new", (req, res) => {
    console.log(req.body);   //undefined ,因为express对它有封装，需要借助中间件 bodyPaser。
    const {title, content} = req.body;
    console.log(title, content);
    if (!title || !content)
        return res.status(400).render("404", {err: "标题或内容不能为空！"});

    //对时间的格式的更改方法
    req.body.publiced = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
    entries.push({
        title, content, published: moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
    });
    return res.redirect("/");

    // return fs.appendFile(path.join(__dirname, "./data/index.txt"),
    //     JSON.stringify(req.body) + ",", err => {
    //         if (err) return res.status(503).render("503", {err: "数据库异常！请稍后再试！"});
    //         return res.redirect("/");
    //     }
    // );
});

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3000);


