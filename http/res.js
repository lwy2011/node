const http= require('http')

http.createServer((req,res)=>{
    console.log(res.headersSent ? "res.header sended" : "res.header do not sended!");  //判断响应头发送了没
    res.setHeader('Content-Type','text/html;charset=utf-8 ')   //设置响应头,比如出现乱码的时候
    res.writeHead(200,'ok')  //发送响应头
    res.write("<h2>哈哈哈</h2>")
    res.write("<h2>哈哈哈</h2>")
    res.write("<h2>哈哈哈</h2>")
    res.write("<h2>哈哈哈</h2>")
    res.write("<h2>哈哈哈</h2>")
    //只要有响应体，页面就会有内容，并且控制台才能看到响应的内容，不过只有响应头的内容

    res.end("<h2>哈哈哈</h2>");
    //无end结束，页面是一直都在等待中
    console.log(res.headersSent ? "res.header sended" : "res.header do not sended!");

}).listen(3000,'localhost',()=>{
    console.log("listening");
})