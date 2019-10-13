const fs = require('fs');

//打开文件

fs.open(
    __dirname+'/source/c.txt','w',
    (err,fd)=>{

        //写入操作
        !err && fs.writeFile(fd,"异步写入" + new Date() + '\n',(err)=>{
            console.log(err || "succeed")
        });

        //关闭
        fs.close(fd,(err)=>{
            console.log(err || "closed");
            //读取验证
            fs.readFile(__dirname+'/source/c.txt',(err,data)=>{
                console.log(err || data.toString());
            })
        })
    }
)

console.log("一步测试");

fs.open(
    __dirname+'/source/d.txt','a',      //测试flag为'a'
    (err,fd)=>{
        !err && fs.writeFile(fd,"异步写入" + new Date() + '\n',(err)=>{
            console.log(err || "succeed")
        })
        //关闭
        fs.close(fd,(err)=>{
            console.log(err || "closed");
            fs.readFile(__dirname+'/source/d.txt',(err,data)=>{
                console.log(err || data.toString());
            })
        })
    }
)

