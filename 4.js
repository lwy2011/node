

//引入3.js

const x = require('./3.js')

console.log(x)

//第一种：{ a: 12, b: [Function: b] }


//第二种{ a: 12, b: [Function: b], c: {} }

//第三种 {}
//第三种，源于前面讲的单文件模块的实质，最后返回的是module.exports
