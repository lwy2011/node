const fs = require('fs');


//可读流的创建
const rs = fs.createReadStream('/Users/liuwanyong2017/Desktop/20191013_170954.mp4');
//可写流的创建
const ws = fs.createWriteStream(__dirname+'/source/mv1.mp4');

//默认两种创建了，自动open通道了，开始了传流。

rs.once('open',()=>{
    console.log("开通通道了，读取流打开了")
})

ws.once('open',()=>console.log('写入流打开了'));

rs.on('data',data=>{
    console.log(data);
    ws.write(data)
});

rs.once('end',()=>{
    console.log("end");
});

rs.once('close',()=>{
    console.log("closed");
});