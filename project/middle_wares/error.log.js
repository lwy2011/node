import ErrorModel from "../model/error.log";

//中间键是纯函数，不是路由，路由需要express.Router

const errRouter = (err, req, res, next) => {
    // console.log(err, 222);
    if (err) {
        console.log("err:", err, "err.log");
        const error = new ErrorModel({
            error_name: err.name,
            error_message: err.message,
            error_stack: err.stack
        });
        error.save((e, data) => {
            // console.log(data, "ok");
            if (e) {console.log(e);}
            res.json({
                status: 500,
                result: "服务器出错，或数据库查找不到，请稍后再试！",
                detail : err.message
            });
        });
    }
};

export default errRouter;