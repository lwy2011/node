

//创建服务器

const http = require('http')

http.createServer((req,res)=>{
    res.end("创建服务器成功了！！")
}).listen(3030,'127.0.0.1',()=>{
    console.log("服务器启动");
});