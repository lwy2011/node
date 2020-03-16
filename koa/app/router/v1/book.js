import Router from "koa-router";
import Auth from "../../../middlewares/auth";
import HotBook from "../../model/hot-book";
import PositiveIntegerValidator from "../../validators/positiveInteger";
import Book from "../../model/book";


const router = new Router({prefix: "/v1/book"});


router.get("/:id/detail", new Auth(2).token, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx);
    const {id} = v.get("path");
    const book = await new Book(id).detail();
    console.log(book);
    ctx.body = JSON.stringify(book);
});
router.get("/hot_list", new Auth(2).token, async ctx => {
//book 图书的基本信息，是基础数据，跟业务无关，所以是基础服务数据
    //这的项目间接调用基础服务数据，本项目的book数据表只存图书的一部分数据。业务型数据库
    const books = await HotBook.getAll();
    ctx.body = {books};
});


export default router;