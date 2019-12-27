import Router from "koa-router";
import RegisterValidator from "../../validators/register";
import User from "../../model/user";
import {Success} from "../../../core/http-exception";

const router = new Router({
    prefix: "/v1/user"
});


//注册，

router.post("/register", async (ctx) => {
    //参数，validator
    //nickname password1  password2  email

    const v = await new RegisterValidator().validate(ctx);
    // const salt = bcrypt.genSaltSync(10);   //10是计算的成本复杂设置数，一般般就可以了
    // const pwd = bcrypt.hashSync(v.get("body.password1"),salt);
    const user = {
        nickname: v.get("body.nickname"),
        password: v.get("body.password1"),
        email: v.get("body.email")
    };
    await User.create(user);
    // console.log(12, User);
    throw new Success();

});


export default router;