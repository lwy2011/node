import Router from "koa-router";
import TokenValidator from "../../validators/token";


const router = new Router({
    prefix: "/v1/token"
});


router.post("/", async (ctx) => {  //为了账号安全，POST而不是get
    const v = await new TokenValidator().validate(ctx)
});


export default router;