import express from "express";
import configs from "../config";
import nunjucks from "nunjucks";
import router from "../router/index";
import url from "url";

const app = express();

//静态文件的路由设置
app.use(express.static(configs.publicPath));


//模板引擎的中间键的配置
nunjucks.configure(configs.viewPath, {
    autoescape: true,
    express: app,
    noCache: true     //开发阶段模板不用缓存的设置，记得上线时去掉
});


//配置router

app.use(router);


//404放最后的路由

app.use((req, res) => {
    const urlObj = url.parse(req.url);
    const helper = req.url.indexOf("web") >= 0 ? "web" : "back";
    console.log(urlObj, req.url);
    res.render("404.html", {helper});
});

app.listen(3000, () => {
    console.log("listening");
});

