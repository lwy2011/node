import express from "express";
import configs from "../config";
import nunjucks from "nunjucks";
import router from "../router/index";

import rollRouter from "../router/roll";
import rollEditRouter from "../router/roll.edit.js";
import bodyParser from "../middle_wares/body_parser";
import errRouter from "../middle_wares/error.log";
import userRouter from "../router/user.js";
import userApiRouter from "../router/user.edit.js";
import session from "express-session";
import login_pass from "../middle_wares/login_pass.js";
import sourceRouter from "../router/source.js";
import sourceApiRouter from "../router/source.api.js";
import sourceWebRouter from "../router/source.web.js";

const app = express();


// 设置session中间键，为了把请求的数据的session存到req.session中

const sessionStorage = require("connect-mongo")(session);

app.use(session({
    name: "user_id",   //session ID cookie 的名字，自有默认值,浏览器端可看到  http://www.expressjs.com.cn/en/resources/middleware/session.html
    cookie: {maxAge: 12 * 3600 * 1000},    //过期时间,ms为单位的！
    secret: "project",  //加密的字符串
    resave: false,              //强制每次请求都要重新更新cookie设置，重置过期时间
    saveUninitialized: true,            //强制储存未初始化的session，这时候session未设定属性或值。设定cookie前，有助于登录验证，权限控制，减轻服务器压力
    rolling: true,    //强制每次响应都
    store: new sessionStorage({
        url: "mongodb://127.0.0.1/project",   //连接数据库地址，https://www.npmjs.com/package/connect-mongo
        touchAfter: 6 * 3600 // time period in seconds   监听并更新session的数据库的信息的触发时长
    })
}));


//静态文件的路由设置1

app.use(express.static(configs.publicPath));

//模板引擎的中间键的配置
nunjucks.configure(configs.viewPath, {
    autoescape: true,
    express: app,
    noCache: true     //开发阶段模板不用缓存的设置，记得上线时去掉
});


//设置权限控制中间键

app.use(login_pass);


//添加bodyParser中间键，为了区分get,post,请求，并把post请求的数据放到req.body的上面

app.use(bodyParser);


//配置router

app.use(router);

//轮播图路由

app.use("/back/roll", rollRouter);
app.use("/imgs/api/roll", rollEditRouter);

//用户路由


app.use(userRouter);

app.use("/user/api", userApiRouter);


//文章数据路由

app.use("/back/source", sourceRouter);
app.use("/source/api/", sourceApiRouter);
app.use("/web/source", sourceWebRouter);
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

