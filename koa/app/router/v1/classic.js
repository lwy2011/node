import Router from "koa-router";
// import {ParameterException} from "../../../core/http-exception";
import PositiveIntegerValidator from "../../validators/positiveInteger";

const router = new Router();


router.get("/v1/classic", (ctx) => {
    ctx.body = {src: "classic"};
});

const latest = new Router();
latest.get("/v1/classic/latest", ctx => {
    ctx.body = {t: "latest"};
});

//传参练习：
latest.post("/v1/:id/classic/latest", (ctx, next) => {
    const {params} = ctx;
    //body 参数需要 koa-bodyparser中间键来合成的！
    const {query, header, body} = ctx.request;   //对应：路由传参，？传参，header传参

    // console.log(params, query, header, body);

    const v = new PositiveIntegerValidator();
    v.validate(ctx);
    const id = v.get("path.id");
    console.log( id);
    // if (true) {
    //     throw new ParameterException()
    // } else {
    //     ctx.body = {params, query, header, body};
    // }
});
export default router;
export {latest};