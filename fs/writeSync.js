const fs = require('fs')

//同步写入

//打开文件，默认flag为'w'，没有文件就是创建，有文件，写入的东西就覆盖之前的文件内容
//flag 还有 r ,a等。r是读为主，文件不存在就报错。a是在源文件内容不变的基础上，后续添加内容

const fd = fs.openSync(__dirname+'/source/b.txt','w');
console.log("open");

//写入
fs.writeFileSync(fd,"我很牛皮啊！！");
console.log("write");

//保存并关闭

fs.closeSync(fd)

console.log("close");

fs.readFile(__dirname+'/source/b.txt',(err,data)=>{
    !err && console.log(data.toString())
});




const fd1 = fs.openSync(__dirname+'/source/b.txt','w');
console.log("open");

//写入
fs.writeFileSync(fd1,"哈哈哈！！");
console.log("write");

//保存并关闭

fs.closeSync(fd1)

console.log("close");

fs.readFile(__dirname+'/source/b.txt',(err,data)=>{
    !err && console.log(data.toString())
});


//结果都是：哈哈哈,说明打印出来这个操作异步的太久了
setTimeout(
    ()=>{
        const fd1 = fs.openSync(__dirname+'/source/b.txt','w');
        console.log("open");

//写入
        fs.writeFileSync(fd1,"刘万永！！");
        console.log("write");

//保存并关闭

        fs.closeSync(fd1)

        console.log("close");

        fs.readFile(__dirname+'/source/b.txt',(err,data)=>{
            !err && console.log(data.toString())
        });
    },1000
)