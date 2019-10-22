//选择或者创建数据库

// use dataname


// show dbs
// admin   0.000GB
// config  0.000GB
// local   0.000GB
// mydb    0.000GB
// test    0.000GB

// use test
// switched to db test


//创建集合,并写入数据，集合名称为colleges,数据为数组，内部为对象

// db.colleges.insert({
//  {name:'html'},
//  {name:'js'},
//  {name:'php',intro:'世界上最好的语言'},
//  {name:'Java'},
//  {name:'区块链'}
// })


// db.create.insert({})     //必须要有对象，否则报错，空的也行
// WriteResult({ "nInserted" : 1 })


//展示colleges的所有的文档

// db.colleges.find()    colleges为集合的名称



//插入一条文档

//db.colleges.insert({name:'ddgd'})

//集合有多少条文档

// db.colleges.find().count()


//查询文档
// db.colleges.find({name:'js'})


//修改文档，先查询，再修改
// db.colleges.update({name:'js'},{$set:{intro:'全站牛皮'}})

//替换文档

//db.colleges.replaceOne({name:'k12'},{name:'java',intro:'难啊！'})


//删除文档里的一个属性
// db.colleges.update({name:'PHP'},{$unset:{intro:'世界上最好的语言'}})


//添加文档的一个属性
//db.colleges.update({name:'js'},{$set:{classes:{base:['Events','Dom','js语法'],heighter:['面向对象','继承']}}})

//查询深层内部的属性匹配

// db.colleges.find({'classes.heighter':"面向对象"})  //属性们链接起来


//插入次级嵌套属性

// db.colleges.update({name:'js'},{$push:{'classes.base':'jquarry'}})
//这种的可以重复添加相同的内容，不管之前有木有相同的内容,而且添加的容器不是限定为数组了

//db.colleges.update({name:'js'},{$addToSet:{'classes.base':'jquarry'}})
//这种的不可以添加已经存在的内容



//删除集合内的所有文档

//db.colleges.remove({})

//删除集合

//db.colleges.drop()


//集合中插入10000条数据
// for(var i=0;i<=9999;i++){db.test1.insert({id:i})}
//插入了一万次，性能！！

//一次插入10000条
// var arr = []
//
// for (var i =0;i<9999;i++){
//     arr.push({id:i})
// }
//
// db.test1.insert(arr)


//查询小于666的数据
// db.test1.find({id:{$lt:666}})

//查询大于9800的
// db.test1.find({id:{$gt:9800}})


//查询大于9800小于9810的
//db.test1.find({id:{$lt:9810,$gt:9800}})

//查询前十条
//db.test1.find({id:{$lte:9}})  从0开始的，小于等于9的意思
//db.test1.find({}).limit(10)

//懒加载，多次累加获取
//db.test1.find({}).skip(0).limit(10)
//db.test1.find({}).skip(10).limit(10)
//db.test1.find({}).skip(20).limit(10)

//多表查询逻辑,思路是一个表查到一个中间值，然后通过中间值再查，就是如此
// var cno = db.classes.find({cname:'html'}).cno
// db.section = db.section.find({cno:cno})


//多个条件
// db.section.find(
//     {
//         $or:[
//             {wages:{$gt:15000}},
//             {wages:{$lte:12000}}
//             ]
//     })

//属性值低于10000的都加1000
// db.section.update({wages:{$lte:10000}},{$inc:{wages:1000}})
