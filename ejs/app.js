

const http = require('http')

const fs = require('fs')
const path = require('path')
const url = require('url')
const resHeaderHelper = require('./helper/fileType.js')
const ejs = require('ejs');

const readData = (Path)=>{
    return new Promise((resolve ,reject)=>{
        fs.readFile(path.join(__dirname,Path),(err,data)=>{
            if (err) {
                reject(err)
            }else{
                //console.log(data.toString());
                resolve(data)
            }
        })
    })
};

http.createServer((req,res)=>{
    //解析路由：
    const {pathname} = url.parse(req.url)
    const Path = pathname === '/' ? '/index.ejs' : pathname
    const suf = path.extname(Path) || 'text/plain';

    // console.log(Path,path.extname(Path),5555);  说明这个方法最终得到的后缀是'.html'形式，还带.，所以对应的字典一定要注意

    const errFn = err =>{
        res.writeHead(404);
        res.end(`<h3>${err}</h3>`)
    };
    //拿到目标文件
    const fileData =  readData('/view' + Path);

    //readData数据库数据

    const data = pathname === '/' && readData('./data/index.json');


    //响应头设置
    // const resHeader = suf => res.writeHead(200,{
    //     'Content-Type':`${resHeaderHelper[suf]};charset=utf-8`
    // });

    Promise.all([fileData,data]).then(
        ([file,data])=>{
            res.writeHead(200,{
                'Content-Type':`${resHeaderHelper[suf]};charset=utf-8`
            });
            let value = file.toString();
            if(data){
                console.log(JSON.parse(data),data,111);
                value = ejs.render(file.toString(),JSON.parse(data));
            }
            // console.log(data,22,file);

            res.end(value)
        },
        errFn
    )

}).listen(3000,'localhost');

