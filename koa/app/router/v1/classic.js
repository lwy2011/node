import Router from "koa-router";
import Auth from "../../../middlewares/auth";
// import PositiveIntegerValidator from "../../validators/positiveInteger";

const router = new Router({
    prefix: "/v1/classic"
});


// router.get("/v1/classic", (ctx) => {
//     ctx.body = {src: "classic"};
// });
//
// const latest = new Router();
// latest.get("/v1/classic/latest", ctx => {
//     ctx.body = {t: "latest"};
// });

//传参练习：
// latest.post("/v1/:id/classic/latest", async (ctx, next) => {
//     const {params} = ctx;
//     //body 参数需要 koa-bodyparser中间键来合成的！
//     const {query, header, body} = ctx.request;   //对应：路由传参，？传参，header传参
//
//     // console.log(params, query, header, body);
//
//     const v = await new PositiveIntegerValidator();
//     v.validate(ctx);
//     const id = v.get("path.id");
//     console.log( id);
//     // if (true) {
//     //     throw new ParameterException()
//     // } else {
//     //     ctx.body = {params, query, header, body};
//     // }
// });


//测试前端发送token过来，验证token：
router.get("/latest", new Auth(9).token,async (ctx, next) => {
    //这里第一个中间键已经验证好了前端的token值了。
    //现在要对用户做权限管理！
    // 思路，用户分级，路由分级：这里就用到那个scope数据了，
    //scope源于Auth中间键！数字表示！Auth那里，枚举所有的用户的类型赋值数值，分级大小。
    //同时Auth的this.level是到时候在路由那里充当中间键实例化时，把路由的等级数值传入，这样就可以比较了！
    // 所以这里的 new Auth(2).token,里的2就是代表当前的路由等级为2.
    ctx.body = ctx.auth
});
export default router;
// export {latest};