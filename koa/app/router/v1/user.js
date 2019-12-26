import Router from "koa-router";
import RegisterValidator from "../../validators/register";
import User from "../../model/user";

const router = new Router({
    prefix: "/v1/user"
});


//注册，

router.post("/register", async (ctx) => {
    //参数，validator
    //nickname password1  password2  email

    const v = await new RegisterValidator().validate(ctx);

    const user = {
        nickname: v.get("body.nickname"),
        password: v.get("body.password"),
        email: v.get("body.email")
    };
    await User.create(user);
    console.log(12,User);


});


export default router;