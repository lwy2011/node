const http = require('http')
const fs = require('fs')
const path = require('path')
http.createServer((req,res)=>{
    const Path = path.join(__dirname,'require.log')
    const ws = fs.createWriteStream(Path,{flags:'a'})
    res.end("req  test!",()=>{
        ws.write(`1. method:  ${req.method} \n`)
        ws.write(`2. headers:  ${JSON.stringify(req.headers)} \n`)
        ws.write(`3. url:  ${req.url} \n`)
        ws.write(`4. httpVersion:  ${req.httpVersion} \n`)
        ws.write(`5. time:  ${new Date()} \n`)
    })
}).listen(3000,'localhost',()=>{
    console.log("listening");
});

//请求日志，很奇怪的是 ，每次请求都是写入两遍。