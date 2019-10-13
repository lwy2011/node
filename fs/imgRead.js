//同样是用readFile 和 writeFile两个方法。


const fs = require('fs');

fs.readFile('/Users/liuwanyong2017/Desktop/my.png',(err,data)=>{
    console.log(err||"读取成功");
    !err &&
    fs.writeFile(__dirname+'/source/me.png',data,err1 => {
        console.log(err1||"写入成功");
        !err&&console.log(data);
    })
});

//读取是拿到二进制数据流，存到缓存里，然后写入，是存到内存里。