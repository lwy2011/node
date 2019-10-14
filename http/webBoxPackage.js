//封装静态文件的web容器，更加合理

const http =require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const sufObj = require('./webBoxHelper.js')

http.createServer((req,res)=>{
    const {pathname} = url.parse(req.url)
    //思路是pathname 作为参数，来合成文件的读取路径。
    const Path = pathname === '/' ? '/index.html' : pathname
    const arr = Path.split('.')
    const suf = arr[arr.length-1]


    fs.readFile(path.join(__dirname,`../webBoxSource/${Path}`),(err,data)=>{
        res.writeHead(!err?200:404,{
            'content-type':`${sufObj[suf]};charset=utf-8`
        })
        res.end(data || `<h1>${err}</h1>`)
    })
}).listen(3000,'localhost');