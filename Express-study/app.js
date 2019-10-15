
const express = require('express')


const app = express()
app.listen(3000,()=>{
    console.log('listening');
});

app.get('/',(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.end('<h1>Express Study!</h1>')
});

