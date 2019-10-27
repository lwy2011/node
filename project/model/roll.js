import db from "./index.js";
import mongoose from "mongoose";

const imgSchema = mongoose.Schema({
    img_title: {
        type: String, required: true
    },
    img_url: {
        type: String, required: true
    },
    img_link: {
        type: String, required: true
    },
    createdAt: {
        type: String, required: true
    },
    end_time: {
        type: String, required: false
    },
    l_edit: {
        type: String, default: new Date()
    }
});
//db.imgs.renameCollection('rollImg')
const imgModel = db.model("rollImg", imgSchema);


export default imgModel;





