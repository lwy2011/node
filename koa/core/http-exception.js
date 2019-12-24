class HttpException extends Error {
    constructor(msg = "服务器错误！", code = "10000", status = 400) {
        super();
        this.code = code;
        this.msg = msg;
        this.status = status;
    }
}

export default HttpException;

// module.exports = {HttpException};