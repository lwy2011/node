const http = require('http')

const server = http.createServer((req,res)=>{
    res.end("hello world!")
})

server.listen(3000,'127.0.0.1',()=>{
    console.log("createed!");
    setTimeout(()=>{
        server.close()
    },4000)
})


server.on('close',()=>{
    console.log("closed");
})

