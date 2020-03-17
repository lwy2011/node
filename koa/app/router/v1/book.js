import Router from "koa-router";
import Auth from "../../../middlewares/auth";
import HotBook from "../../model/hot-book";
import PositiveIntegerValidator from "../../validators/positiveInteger";
import Book from "../../model/book";
import BookSearchValidator from "../../validators/book-search";


const router = new Router({prefix: "/v1/book"});


router.get("/:id/detail", new Auth(2).token, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx);
    const {id} = v.get("path");
    const book = await new Book(id).detail();
    // console.log(book);
    ctx.body = JSON.stringify(book);
});
router.get("/hot_list", new Auth(2).token, async ctx => {
//book 图书的基本信息，是基础数据，跟业务无关，所以是基础服务数据
    //这的项目间接调用基础服务数据，本项目的book数据表只存图书的一部分数据。业务型数据库
    const books = await HotBook.getAll();
    ctx.body = books;
});
router.get("/search", new Auth(2).token, async ctx => {
    const v = await new BookSearchValidator().validate(ctx);
    const books = await Book.search(
        v.get("query.q"), v.get("query.start"), v.get("query.count")
    );
    // console.log(books,'bb');
    ctx.body = books;
});

router.get('/:id/favor',new Auth(2).token,async ctx=>{
    const v = await new PositiveIntegerValidator().validate(ctx)
    //一本书的点赞情况，favor表，同时，检查，自己有木有点赞过
})

export default router;