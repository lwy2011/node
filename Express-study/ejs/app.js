const express = require("express");


const path = require("path");


const app = express();
const fs = require("fs");

app.listen(3000);


//用ejs 模板


//绑定模板：
app.set("views", "./view");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "view")));
//这个必须要有，因为模板只是发送了ejs文件，后续的js,css需要它。

app.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "../data/index.json"), (err, data) => {
        if (err) throw err;
        res.render("index", JSON.parse(data.toString()));
    });
});