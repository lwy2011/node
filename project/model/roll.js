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
const RollModel = db.model("rollImgs", imgSchema);


const creatRoll = data => RollModel.create(
    {
        img_title: data.title,
        img_url: data.url,
        img_link: data.link,
        createdAt: new Date(),
        l_edit: new Date(),
        end_time:data.end_time || ''
    }
);

export default RollModel;
export {creatRoll}





