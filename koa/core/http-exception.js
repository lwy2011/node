class HttpException extends Error {
    constructor(msg = "服务器错误！", code = "10000", status = 400) {
        super();
        this.code = code;
        this.msg = msg;
        this.status = status;
    }
}


class ParameterException extends HttpException {
    constructor(msg,code) {
        super();
        this.msg = msg || "参数错误！";
        this.code = code || 10001;
        this.status = 400;
    }
}

export default HttpException;
export {ParameterException}