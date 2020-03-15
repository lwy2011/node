import Router from "koa-router";
import Auth from "../../../middlewares/auth";
import HotBook from "../../model/hot-book";


const router = new Router();


router.get("/v1/book", new Auth(2).token, (ctx) => {
    ctx.body = {src: "book"};
});
router.get("/v1/book/hot_list", new Auth(2).token, ctx => {
//book 图书的基本信息，是基础数据，跟业务无关，所以是基础服务数据
    //这的项目间接调用基础服务数据，本项目的book数据表只存图书的一部分数据。业务型数据库

});


export default router;