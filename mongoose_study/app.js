const mongoose = require("mongoose");
//引入，然后连接数据库服务器
mongoose.connect(
    "mongodb://localhost:27017/colleges", {useNewUrlParser: true}
);  //使用新的路径解析方式,这个参数是提醒新的版本可能会废除旧版本的解析方式

//拿到数据库实例
const db = mongoose.connection;
//监听数据库的事件
db.on("open", () => {
    console.log("connected!");
});
db.on("error", () => {
    console.log("error");
});
db.on("close", () => {
    console.log("closed");
});

//创建模式对象

const Schema = mongoose.Schema;
const person = new Schema({
    name: String,
    age: Number,
    sex: {
        type: String,
        default: "男"
    }
});

//创建model，集合对象
const personModel = mongoose.model("person", person);

//集合中插入文档
// personModel.create({name: "sfe", age: 23}).then(
//     data => {
//         console.log(data);
//     }
// ).catch(
//     err => {console.log(err);}
// );
// personModel.create([
//     {name: "sfe", age: 43, sex: "女"},
//     {name: "234", age: 43, sex: "女"},
//     {name: "233", age: 4, sex: "女"},
//     {name: "233", age: 43, sex: "nan"},
//     {name: "3", age: 43, sex: "女"},
// ]);

//CRUD操作

//AIP 方法 ：https://mongoosejs.com/docs/api/model.html

