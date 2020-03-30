import Router from "koa-router";
import fs from "fs";
import {join} from "path";

const router = new Router();

router.post("/image/upload", async ctx => {
    const data = ctx.request.files.file;
    //读取流：
    // console.log(data, join(__dirname, "../../../static/images/" + data.name));
    const reader = fs.createReadStream(data.path);
    //写入流写入目录设置：
    const stream = fs.createWriteStream(
        join(__dirname, "../../../static/images/" + data.name)
    );
    //读出流与写入流联通，引流：
    reader.pipe(stream);
    await new Promise(resolve => {
        stream.on("close", () => {
            console.log("o");
            resolve()
        });
    }).then(
        ()=>{
            console.log(9);
            ctx.body = {
                url: global.config.host + "images/" + data.name,
                code: "ok"
            };
        }
    )
});
export default router;