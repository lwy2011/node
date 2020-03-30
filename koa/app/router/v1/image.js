import Router from "koa-router";

const router = new Router();

router.post("/image/upload", async ctx => {
    const data = ctx.request.files
    console.log(data);

    ctx.body = {status: 200,data};
});
export default router;