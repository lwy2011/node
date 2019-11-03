import mongoose from "mongoose";
import db from "./index.js";

const Schema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true,default:'溜达先生'},
    img_url: {type: String, required: true},
    link: {type: String},
    is_store: {type: String, default:'0' },
    price: {type: Number, default:0},
    created_at: {type: String, default:new Date().toLocaleString()},
    l_edit: {type: String, default:new Date().toLocaleString()},
    read_count: {type: Number, default:0},
    content : {type:String,required:true}
});


const Source = db.model("sources", Schema);


export default Source;