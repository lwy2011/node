import HttpException from "../core/http-exception";

const catch_error = async (ctx, next) => {
    try {
        await next();    //因为try只能拿到同步的错误，用async可以造成阻塞，同步的理念。
        // 同时用到了koa的洋葱模型，这个中间键是最外边的，所以它是最后完成的！错误绝对会被捕获！
    } catch (error) {
        //前端信息简单明了，后端详细具体的错误信息
        //status 状态码。200 404 路由错误 400 传的参数有问题 401 权限 403 重定向 500
        //message
        // error_code 详细，开发者自定义 100001  100002
        // request_url 当前的请求url
        // console.log(error.error_code);
        console.log(error.constructor,error instanceof HttpException ,HttpException);
        if (error.code) {
            // 已知错误！
            const {msg, status, code} = error;
            ctx.body = {msg,  code, request_url : ctx.method + " " + ctx.path};
            ctx.status = status
        }else{
            ctx.body = "出现未知错误，请稍等，，，";
        }

        // 已知错误   破坏自己定制的规则，比如传参传错了，明确的可判断，人为抛出异常
        // 未知错误    程序自动报错，比如查数据库出问题，程序自己抛出异常
    }
};

export default catch_error;