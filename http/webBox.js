const http = require('http');
const url = require('url')

const  fs = require('fs')
const path = require('path')
//对web容器的模拟，就是对路由和读取写入数据文件的逻辑的结合

http.createServer((req,res)=>{
    //拿到路由
    console.log(req.url);
    // const url = new URL(req.url)  会报错，因为 req.url  = '/'
    const urlObj = url.parse(req.url)
    const {pathname} = urlObj
    console.log(pathname);
    //路由处理，管理
    if(pathname === '/'){
        //读取数据，发送数据
        fs.readFile(path.join(__dirname,'../webBoxSource/index.html'),(err,data)=>{
            if (err ) throw err;
            res.end(data);
            console.log(data);
        })
    }else {
        //读取数据，发送数据
        fs.readFile(path.join(__dirname,`../webBoxSource/${pathname}`),(err,data)=>{
            if (err ) res.writeHead(404);
            //这里其实可以设置响应头的,更加保险
            const arr = pathname.split('.')
            const suf = arr[arr.length - 1]
            res.writeHead(200,{
                'content-type':`text/${suf};charset=utf-8`
            });
            res.end(data || '404');
            console.log(data);
        })
    }
    //但是局限性在于，仅仅是静态文件的获取了。很死板，而且可扩展性太差了，还有个错误

}).listen(3000,'localhost');


