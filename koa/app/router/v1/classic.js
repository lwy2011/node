import Router from "koa-router";


const router = new Router();


router.get("/v1/classic", (ctx) => {
    ctx.body = {src: "classic"};
});

const latest = new Router();
latest.get("/v1/classic/latest", ctx => {
    ctx.body = {t: "latest"};
});

export default router;
export {latest};