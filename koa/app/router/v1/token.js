import Router from "koa-router";
import TokenValidator from "../../validators/token";
import LoginType from "../../../core/enum";
import User from "../../model/user";
import HttpException from "../../../core/http-exception";
import {generateToken} from "../../../core/util";


const router = new Router({
    prefix: "/v1/token"
});


const emailLogin = async (account, password) =>
    await User.verifyEmailPassword(account, password);


router.post("/", async (ctx) => {  //为了账号安全，POST而不是get
    const v = await new TokenValidator().validate(ctx);
    let token;
    switch (v.get("body.type")) {
        case LoginType.user_email:
            const user =
                await emailLogin(v.get("body.account"), v.get("body.password"));
            token = generateToken(user.id, 2);
            break;
        case LoginType.user_mini_program:

            break;
        default:
            throw new HttpException("无法支持的登陆方式！", 10003, 404);
    }
    ctx.body= {token};
});


export default router;