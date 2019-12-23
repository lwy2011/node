import Router from "koa-router";


const router = new Router();


router.get("/v1/book", (ctx) => {
    ctx.body = {src: "book"};
});


export default router;