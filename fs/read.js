const fs = require('fs')   //不是内置的，是核心的模块，需要引入

const test = msg => {
    console.log(msg);
    console.log(msg.toString());
}

//同步读取   readFileSync

const a = fs.readFileSync(__dirname + '/source/a.txt');

console.log('同步');
test(a)


// 同步
// <Buffer 20 e6 88 91 e5 9c a8 e6 b5 8b e8 af 95 6e 6f 64 65 e7 9a 84 66 73 e6 a8 a1 e5 9d 97>
// 我在测试node的fs模块


//同步错误读取，会抛出错误，并且中断执行。
// const b = fs.readFileSync(__dirname+'/source/b.txt')
// Error: ENOENT: no such file or directory, open '/Users/liuwanyong2017/Desktop/node/node/fs/source/b.txt'
//到这了，就会报错，进程崩了，下面的打印不会出现
// console.log("错误同步");
//不会执行


//异步读取 readFile

fs.readFile(__dirname+'/source/a.txt',(err,data)=>{
    !err ? test(data) :
        console.log(err)
})


//错误读取,而且有趣的是它的执行顺序先于上面的异步读取的打印，其实很符合逻辑，I/O耗时的。
fs.readFile(__dirname+'/source/b.txt',(err,data)=>{
    console.log(err);
})

//     [Error: ENOENT: no such file or directory, open '/Users/liuwanyong2017/Desktop/node/node/fs/source/b.txt'] {
//     errno: -2,
//         code: 'ENOENT',
//         syscall: 'open',
//         path: '/Users/liuwanyong2017/Desktop/node/node/fs/source/b.txt'
// }