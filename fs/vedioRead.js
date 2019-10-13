

//基本等同于读取图片的操作

const fs = require('fs');

fs.readFile('/Users/liuwanyong2017/Desktop/20191013_170954.mp4',(err,data)=>{
    console.log(err||"读取成功");
    !err && fs.writeFile(__dirname + '/source/mv.mp4',data,err1=>{
        console.log(err1||"写入成功");
        !err1 && console.log(data)
    })
});


//这是小文件视频，如果是大文件的话，可能会异步到很长时间，可能会出问题的。目前基本够日常用了。
//对文件，都是转化成二进制流的形式，这是要有意识的。