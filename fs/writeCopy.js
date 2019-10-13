//拷贝文件的方法

//fs.copyFile(src,dest,[flag],callbackFn)


const fs = require('fs');

// fs.copyFile(__dirname+'/source/d.txt',__dirname+'/source/e.txt',(err)=>{
//     err ?console.log(err):
//     fs.readFile(__dirname+'/source/e.txt',(err,data)=>{
//         console.log(err || data.toString());
//     })
// });

//flag参数可有可无，暂时没有啥作用，待观察探索
fs.copyFile(__dirname+'/source/d.txt',__dirname+'/source/e.txt','w',(err)=>{
    err ?console.log(err):
        fs.readFile(__dirname+'/source/e.txt',(err,data)=>{
            console.log(err || data.toString());
        })
});


//自己做一个copy方法

const copy = (src,dest,callback)=>{
    fs.readFile(src,(err,data)=>{
        err ?
            console.log(err,"读取失败"):
            fs.writeFile(dest,data,(err)=>{     //这个回调的参数只有一个err，多了自动省略
                console.log(err || "写入成功");

                !err && callback && callback(err,data)
            })
    })
}


copy(__dirname+'/source/c.txt',__dirname+'/source/f.txt',
    (err,data)=>{console.log(err||data.toString());}
    );