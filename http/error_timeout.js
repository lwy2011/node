
//错误监听，超时设定，超时监听

const http = require('http')

const server = http.createServer((req,res)=>{
    console.log("connected");
    res.end("hello world!")
})

server.listen(3000,'localhost',()=>{
    console.log("listening");
})


//错误监听
server.on('error',(e)=>{
    console.log(e.code);
    console.log(e.code === "EADDRINUSE" &&
        "端口号已被占用！");
})


//设置超时
server.setTimeout(
    1000,()=>{
        console.log("1秒");
    }
)

//监听超时
server.on('timeout',()=>{
    console.log("timeout");
})