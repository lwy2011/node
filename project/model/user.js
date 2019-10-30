import db from "./index.js";


import mongoose from "mongoose";


const schema = mongoose.Schema({
    username: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    intro: {
        type: String, required: false, default: "我很懒，不想说话，，，"
    },
    avatar: {
        type: String, required: false
    },
    email: {
        type: String, required: false
    },
    join_at: {
        type: String, required: true
    },
    l_edit: {
        type: String, required: true
    },
    points: {
        type: Number, required: false, default: 100
    },
    gold: {
        type: Number, required: false, default: 0
    },
});

const UserModel = db.model("users", schema);


export default UserModel;