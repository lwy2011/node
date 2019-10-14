const http = require('http')
const queryString = require('querystring')

http.createServer((req,res)=>{
    console.log(req.method);
    let postData = ''
    //POST发送的是数据流，一段一段的，所以必定要有事件监听，数据流传输，以及传输完毕
    if(req.method==="POST" ){
        req.on('data',data=>{
            console.log(data);//        <Buffer 75 73 65 72 3d 32 33 34 26 70 73 64 3d 61 73 64 61>

            postData += data   //数据流，一段一段的数据
        })
        req.on('end',()=>{   //传输完毕所有的数据流
            console.log(postData);   //未经格式化的字符串
            //   所有的流合成了JS数据了         user=234&psd=asda
            //查询字符串的方法  querystringd的
            const data = queryString.parse(postData)   //处理字符串成一个对象
            console.log(data);
            //[Object: null prototype] { user: '234', psd: 'asda' }
            res.setHeader('Content-Type','text/html;charset=utf-8')
            res.end("收到！")
        })
    }
}).listen(3000,'localhost')