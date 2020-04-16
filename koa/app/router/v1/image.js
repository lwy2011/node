import Router from "koa-router";
import uploadImg from "../../model/upload-img";

const router = new Router();

router.post("/image/upload", async ctx => {
    const data = ctx.request.files.avatar;
    //读取流：
    // console.log(data, join(__dirname, "../../../static/images/" + data.name));
    await uploadImg(data).then(
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