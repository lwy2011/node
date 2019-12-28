import basicAuth from "basic-auth";

class Auth {
    constructor() {

    }

    get token() {
        //token检测，
        // 获取token
        //body,header,约定，http天然有身份验证机制httpBasicAuth，放在header里的
        return (ctx, next) => {
            const token = basicAuth(ctx.req);
            // req 是原生的request的对象， ctx.req是封装后的request对象
            ctx.body = token;
        };
    }   //token是个属性，而不是方法！！用的时候，不需要加括号！
}

export default Auth;