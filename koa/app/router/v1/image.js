import Router from "koa-router";

const router = new Router();

router.post("/image/upload", async ctx => {
    console.log(ctx.req);
    ctx.body = {status: 200};
});
export default router;