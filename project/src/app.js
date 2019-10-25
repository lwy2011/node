import express from "express";
import configs from "../config";
import nunjucks from "nunjucks";

const app = express();

//静态文件的路由设置
app.use(express.static(configs.publicPath));


//模板引擎的中间键的配置
nunjucks.configure(configs.viewPath, {
    autoescape: true,
    express: app,
    noCache:true     //开发阶段模板不用缓存的设置，记得上线时去掉
});

app.listen(3000, () => {
    console.log("listening");
});

app.get("/", (req, res) => {
    res.end(`<h1>test</h1>`);
});