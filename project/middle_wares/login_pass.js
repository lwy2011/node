export default (req, res, next) => {
    const {path} = req;
    // console.log(path);
    if (path === "/back/login") return next();

    if (path.indexOf("back") === -1) {
        return next();  //这里的 验证过滤，其实是比较严谨的，省事且不严谨的是，验证展示型页面或者接口
        //这里提出了接口和路由的设计问题了
    }
    console.log(req.session ,111);
    if (req.session && req.session.token) return next();
    if (path.indexOf("api") !== -1) {
        return next(new Error("您无权限，请先登录！"));
    }
    res.redirect("/back/login");
}