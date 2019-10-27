import querystring from "querystring";

const bodyParser = (req, res, next) => {
    const {method, headers} = req;
    const contentType = headers["content-type"];
    //console.log(method.toLowerCase() === "get", contentType && contentType.indexOf("multipart/form-data"));

    //过滤get
    if (method.toLowerCase() === "get") {
        // console.log(22);
        return next();
    }
    //有文件的表单，过滤
    if (contentType && contentType
        .startsWith("multipart/form-data")) {
        // console.log(22);
        return next();
    }

    //处理无文件的表单，要处理成对象格式， application/x-www-form-urlencoded这种,放到req.body上
    let result='';
    req.on("data", chunk => {
        result += chunk;
    });
    req.on("end", () => {
        req.body = querystring.parse(result);   //querystring插件处理urlencoded字符串成对象
        console.log(result, 33, req.body);
    });
    next();
};


export default bodyParser;