import basicAuth from "basic-auth";
import jwt from "jsonwebtoken";
import config from "../config";
import {Forbbiden} from "../core/http-exception";

class Auth {
    constructor(leval) {
        this.leval = leval;   //路由的权限
        Auth.USER = 8;             //user的权限
        Auth.ADMAIN = 16;    //管理员的权限
    }

    get token() {
        //token检测，
        // 获取token
        //body,header,约定，http天然有身份验证机制httpBasicAuth，放在header里的
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req);
            // req 是原生的request的对象， ctx.req是封装后的request对象


            //开始验证token

            //token存在否！

            if (!userToken || !userToken.name) {
                throw new Forbbiden();
            }


            //token对不对！错了，过期了

            try {
                var decoded =
                    jwt.verify(userToken.name, config.security.secretKey);
            } catch (e) {
                let msg;
                if (e.name === "TokenExpiredError") {
                    msg = "token已过期！";
                }
                throw new Forbbiden(msg);
            }
            if (decoded.scope < this.leval) {
                throw new Forbbiden("您没有权限进行操作！",10003,401);
            }
            ctx.auth = {
                uid: decoded.uid,
                scope: decoded.scope
            };
            await next();
        };
    }   //token是个属性，而不是方法！！用的时候，不需要加括号！
}

export default Auth;