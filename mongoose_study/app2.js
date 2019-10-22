const mongoose = require("mongoose");
// "mongodb://localhost:27017/colleges", {useNewUrlParser: true}
mongoose.connect("mongodb://localhost:27017/colleges", {useNewUrlParser: true});

const db = mongoose.connection;

db.on("open", () => {
    console.log("open");
});

db.on("error", err => {
    console.log(err);
});

db.on("close", () => {
    console.log("close");
});
//创建模型，生成集合
const Schema = mongoose.Schema;

const student = new Schema({
    name: String,
    age: Number,
    grade: Number,
    sex: {
        type: String,
        default: "男"
    }
});

const studentModel = mongoose.model("student", student);


//添加
// studentModel.create([
//     {name: "水电费", age: 12, sex: "女", grade: 3},
//     {name: "但是", age: 12, sex: "女", grade: 4},
//     {name: "水", age: 13,  grade: 4},
//     {name: "电费", age: 12, sex: "女", grade: 3},
//     {name: "说的", age: 11,  grade: 4},
//     {name: "额", age: 12,  grade: 5},
//     {name: "额外", age: 12, sex: "女", grade: 4},
// ]).then(data => {
//     console.log(data);
// }).catch(err => {console.log(err);});

// 查询

// studentModel.find({}, (err, docs) => {
//     if (!err) {
//         console.log(docs);
//     }
// });


// studentModel.find({sex: "男"}, (err, docs) => {
//     if (!err) {
//         console.log(docs);
//     }
// });

//优选第一条
// studentModel.findOne({sex: "男"}, (err, data) => {console.log(!err && data);});


//返回的内容只返回一部分
studentModel.find(
    {sex: "男"},
    {name: 1, _id: 0},  //这里是添加过滤的参数，不写的默认不找，——id特殊，必须要手写
    (err, data) => {
        console.log(err || data);
    }
);

studentModel.find(
    {sex: "男"},
    {name: 1, _id: 0},  //这里是添加过滤的参数，不写的默认不找，——id特殊，必须要手写
    {skip: 3, limit: 8},   //这里是添加的从第几条开始，查询几条
    (err, data) => {
        console.log(err || data);
    }
);

//修改其中的属性，匹配一个
// studentModel.updateOne({name: "水"}, {$set: {sex: "女"}}, err => {
//     console.log(!err && "ok");
// });
//
// studentModel.find({name: "水"}, (err, data) => {
//     console.log(err || data);
// });

//修改匹配多个
// studentModel.updateMany({name: "说的"}, {$set: {grade: 65}}, (err, data) => {
//     console.log(err || data);
// });
// studentModel.find({name: "说的"}, (err, data) => {console.log(data);});


//删除  deleteOne | remove
// studentModel.remove({name: "但是"}, (err, res) => {
//     console.log(err || res);
// });

// studentModel.deleteOne({name:'水电费'},(err,res)=>{
//     console.log(err||res);
// })

// studentModel.deleteMany({name: "额"}, (err, data) => {
//     console.log(err || data);
// });

//清空
// studentModel.deleteMany({},(err,res)=>{
//     console.log(studentModel.countDocuments());   //个数
// })


