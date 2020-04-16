import fs from "fs";
import {join} from "path";

const uploadImg = async data => {
    //读取流：
    console.log(data, join(__dirname, "../../static/images/" + data.name));
    const reader = fs.createReadStream(data.path);
    //写入流写入目录设置：
    const stream = fs.createWriteStream(
        join(__dirname, "../../static/images/" + data.name)
    );
    //读出流与写入流联通，引流：
    reader.pipe(stream);
    return await new Promise(resolve => {
        stream.on("close", () => {
            console.log("o");
            resolve();
        });
    });
};
export default uploadImg;