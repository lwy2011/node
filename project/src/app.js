import express from "express";
import configs from "../config";

const app = express();

//静态文件的路由设置
app.use(express.static(configs.publicPath));

app.listen(3000, () => {
    console.log("listening");
});

app.get("/", (req, res) => {
    res.end(`<h1>test</h1>`);
});