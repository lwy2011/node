const express = require("express");

const fs = require("fs");
const path = require("path");
const app = express();
app.listen(3000, () => {
    console.log("listening");
});


//中间键

app.use((req, res, next) => {
    const log = `
    ------------------------------------------------
    1）请求的url :  ${req.url} ; \n
    3）请求的方法 :  ${req.method} ;  \n
    4）请求的时间 :  ${new Date()} ;\n
    ------------------------------------------------
    `;
    fs.appendFile(path.join(__dirname, "/req.log"), log, err => {
        if (err) throw err;
    });
    next();   //代码向下走的，没有的话走不下去！
});


const logWrite = (req, result) => {
    const log = `
    ------------------------------------------------
    1）请求的url :  ${req.url} ; \n
    2）请求的结果 :  ${result} ; \n
    3）请求的方法 :  ${req.method} ;  \n
    4）请求的时间 :  ${new Date()} ;\n
    ------------------------------------------------
    `;
    //appendFile方法，可以连续地写入一个文件里
    fs.appendFile(path.join(__dirname, "/req1.log"), log, err => {
        if (err) throw err;
    });
};

app.get("/", (req, res, next) => {
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.write("<p>第一个中间键！</p>");
    next();    //这里没有next，那就会卡在这里，一直卡着的。
});

app.get("/", (req, res) => {
    res.end("<h1>Express Study!</h1>");   //遇到end方法，中间键停止，不过此函数内下面的logWrite依旧会执行。
    logWrite(req, 200);
});

app.use((req, res, next) => {
    console.log("404");
    res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
    res.end("<h1>404 页面不存在！</h1>");
    logWrite(req, 404);
});