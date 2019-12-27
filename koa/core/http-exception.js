class HttpException extends Error {
    constructor(msg = "服务器错误！", code = "10000", status = 400) {
        super();
        this.code = code;
        this.msg = msg;
        this.status = status;
    }
}

//code一定要从1开始，因为后续判断，对code判断，是否是主动抛出错误还是自动生成的错误。
class ParameterException extends HttpException {
    constructor(msg, code) {
        super();
        this.msg = msg || "参数错误！";
        this.code = code || 10001;
        this.status = 400;
    }
}

class NotFound extends HttpException {
    constructor(msg, code) {
        super();
        this.msg = msg || "请求路径错误，或资源未找到！";
        this.code = code || 10002;
        this.status = 404;
    }
}
class AuthFailed extends HttpException {
    constructor(msg, code) {
        super();
        this.msg = msg || "您没有权限！";
        this.code = code || 10003;
        this.status = 401;
    }
}

class Success extends HttpException {
    constructor(msg = "操作成功！", code = 1) {
        super();
        this.msg = msg;
        this.code = code;
        this.status = 201;
    }
}

export default HttpException;
export {ParameterException, NotFound,Success,AuthFailed};