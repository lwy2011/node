import db from "./index.js";
import * as mongoose from "mongoose";

const errorSchema = mongoose.Schema({
    error_name: {
        type: String, required: true
    },
    error_message: {
        type: String, required: true
    },
    error_stack: {
        type: String, required: true
    },
    error_time: {
        type: Date, default: Date.now()
    }
});

const errorModel = db.model("error_logs", errorSchema);


export default errorModel;