//数据库入口文件

import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/project", {useNewUrlParser: true});

const db = mongoose.connection;

db.on("open", () => {
    console.log("opening");
});

db.on("error", (e) => {
    console.log(e);
    throw e;
});

db.on("close", () => {
    console.log("close");
});


export default db;