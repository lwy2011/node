import Router from "koa-router";
import RegisterValidator from "../../validators/register";

const router = new Router({
    prefix: "/v1/user"
});


//注册，

router.post("/register", async (ctx) => {
    //参数，validator
    //nickname password1  password2  email

    const v = new RegisterValidator();
    console.log(v,ctx.body);
    v.validate(ctx);
});


export default router;