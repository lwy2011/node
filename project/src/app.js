import express from "express";
import configs from "../config";
import nunjucks from "nunjucks";
import router from "../router/index";

import rollRouter from "../router/roll";
import rollEditRouter from "../router/roll.edit.js";
import bodyParser from "../middle_wares/body_parser";
import errRouter from "../middle_wares/error.log";
import userRouter from "../router/user.js";

const app = express();


//静态文件的路由设置1

app.use(express.static(configs.publicPath));

//模板引擎的中间键的配置
nunjucks.configure(configs.viewPath, {
    autoescape: true,
    express: app,
    noCache: true     //开发阶段模板不用缓存的设置，记得上线时去掉
});


//添加bodyParser中间键，为了区分get,post,请求，并把post请求的数据放到req.body的上面

app.use(bodyParser);


//配置router

app.use(router);

//轮播图路由

app.use("/back/roll", rollRouter);
app.use("/imgs/api/roll", rollEditRouter);

//用户路由


app.use(userRouter);

//err中间键的添加

app.use(errRouter);


//404放最后的路由

app.use((req, res) => {
    // const urlObj = url.parse(req.url);
    // const helper = req.url.indexOf("web") >= 0 ? "web" : "back";
    // console.log(urlObj, req.url);
    res.render("404.html");
});

app.listen(3000, () => {
    console.log("listening");
});

