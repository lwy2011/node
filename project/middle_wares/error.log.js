import ErrorModel from "../model/error.log";

//中间键是纯函数，不是路由，路由需要express.Router

const errRouter = (err, req, res, next) => {
    console.log(err, 222);
    const error = new ErrorModel({
        error_name: err.name,
        error_message: err.message,
        error_stack: err.stack
    });
    error.save((err, data) => {
        console.log(data, "ok");
        res.end({
            status: 500,
            result: "服务器出错，请稍后再试！",
            message: err.message
        });
    });
};

export default errRouter;