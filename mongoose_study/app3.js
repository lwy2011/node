const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/colleges", {useNewUrlParser: true});

const db = mongoose.connection;

db.on("open", () => {
    console.log("open");
});

db.on("close", () => {
    console.log("close");
});

db.on("error", err => {
    console.log(err);
});

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    age: Number,
    sex: {
        type: String,
        default: "男"
    },
    grade: Number
});

const studentModel = db.model("student", studentSchema);

//get ,set 方法，转JSON方法
studentModel.findOne({}, (err, data) => {
    console.log(err || data);
    console.log(data.get("name"), data.set("grade", 4));
    data.toJSON();
    data.toObject();
});