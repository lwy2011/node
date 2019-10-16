//这是在做完ejs demo 之后，对express 的细节学习的补充


//中间键细节处理

const express = require("express");


const app = express();
const fs = require("fs");
const path = require("path");

const writeErr = (err, callback) => {
    const err_log = `
    ==================================================
    1) 错误名 ： ${err.name} ；\n
    2) 错误信息 ： ${err.message} ；\n
    3) 错误时间 ： ${new Date()} ；\n
    4) 错误堆栈 ： ${err.stack} 。\n
    ==================================================
    `;
    fs.appendFile(path.join(__dirname, "./app2.error.log"), err_log, err => {
        callback && callback();
    });
};

app.get("/", (req, res, next) => {
    // res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
    // res.end(`<h2>hello</h2>`);  这里end之后，下面就不能再end了。TCP断开了！
    try {
        const data = JSON.parse("{sdd:");
        res.json(data);
    } catch (e) {
        next([e, 500]);     //错误出现了，不应该让错误出现在页面，用户会看懵的。捕捉错误，并且写入日志
    }
});


app.get("/1", (req, res, next) => {
    fs.readFile(path.join(__dirname, "/1"), (err, data) => {
        if (err) next([err, 404]);
        data && res.end(data.toString());
    });
});

app.use(([err, status], req, res, next) => {   //错误放在最后面
    console.log(err, status);
    const errMsg = {
        404: "页面不存在！",
        500: "服务器出错！"
    };
    const resFn = () => {
        res.writeHead(status, {"content-type": "text/html;charset=utf-8"});
        res.end(`<h2>${status},${errMsg[status + ""]}</h2>`);
    };
    writeErr(err, resFn);
});
app.listen(3000, () => console.log("listening"));