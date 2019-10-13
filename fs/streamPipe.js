const fs = require('fs')

const rs = fs.createReadStream('/Users/liuwanyong2017/Desktop/20191013_170954.mp4')
const ws = fs.createWriteStream(__dirname+'/source/mv2.mp4');

rs.pipe(ws);  //官方的pipe方法，封装好的流方法。


//自定义的pipe方法：

const ws1 = fs.createWriteStream(__dirname+'/source/mv3.mp4');


rs.on('data',(data)=>{
    const state = ws1.write(data)
    console.log(state);   //写入是否清空了缓存里的读取好的数据流，Boolean值,false
    if(!state){
        //未完成写入当前已读取的数据流时
        rs.pause()   //暂停
    }
});

ws1.on('drain',()=>{   //当ws写入了当前缓存里的所有的流数据了，会触发drain方法的
    rs.resume()     //开启继续读取生成流数据
})

rs.once('end',()=>{
    console.log("read end");
    ws1.end();
});
