import Router from "koa-router";
import Auth from "../../../middlewares/auth";
// import PositiveIntegerValidator from "../../validators/positiveInteger";
import Flow from "../../model/flow.js";
import Art from "../../model/art";
import PositiveIntegerValidator from "../../validators/positiveInteger";
import LikeClassicValidator from "../../validators/like-classic";
import {NotFound} from "../../../core/http-exception";
import Favor from "../../model/favor";

const router = new Router({
    prefix: "/v1/classic"
});


// router.get("/v1/classic", (ctx) => {
//     ctx.body = {src: "classic"};
// });
//
// const latest = new Router();
// latest.get("/v1/classic/latest", ctx => {
//     ctx.body = {t: "latest"};
// });

//传参练习：
// latest.post("/v1/:id/classic/latest", async (ctx, next) => {
//     const {params} = ctx;
//     //body 参数需要 koa-bodyparser中间键来合成的！
//     const {query, header, body} = ctx.request;   //对应：路由传参，？传参，header传参
//
//     // console.log(params, query, header, body);
//
//     const v = await new PositiveIntegerValidator();
//     v.validate(ctx);
//     const id = v.get("path.id");
//     console.log( id);
//     // if (true) {
//     //     throw new ParameterException()
//     // } else {
//     //     ctx.body = {params, query, header, body};
//     // }
// });


//测试前端发送token过来，验证token：
router.get("/latest", new Auth(2).token, async (ctx) => {
    //这里第一个中间键已经验证好了前端的token值了。
    //现在要对用户做权限管理！
    // 思路，用户分级，路由分级：这里就用到那个scope数据了，
    //scope源于Auth中间键！数字表示！Auth那里，枚举所有的用户的类型赋值数值，分级大小。
    //同时Auth的this.level是到时候在路由那里充当中间键实例化时，把路由的等级数值传入，这样就可以比较了！
    // 所以这里的 new Auth(2).token,里的2就是代表当前的路由等级为2.
    // ctx.body = ctx.auth={uid,scope}

    // 以上对token进行验证成功了，下面就开始，发送数据了：

    // 最新一期，从flow表里通过index字段排序，拿最大的。
    //拿到最新的flow，用里面的type定位是什么种类的资源，查哪个表，用art_id定位表里的信息
    // const flow = await Flow.findOne(  //拿第一个数据，排序，从大到小。
    //     {
    //         order: [
    //             ["index", "DESC"]
    //         ]
    //     }
    // );
    // const art = await Art.getData(flow.type, flow.art_id, "noTime");
    //art 要加入期刊的期数：
    // art.index = flow.index 这样直接加不行：Sequelize返回的数据包是个类，而koa的ctx.body会处理成json格式，
    //Sequelize内部对数据，指定为art.dataValues的数据，Sequelize会告诉用它的框架，返回这部分数据，
    // 加要加到这上面来，直接加也行，但是很不好，很突兀，也很违反类的私有化属性，通过Sequelize的内置方法。
    // art.setDataValue("index", flow.index);

    const art = await Flow.getArt(
        {order: [["index", "DESC"]]}, "noTime"
    );
    ctx.body = art;
});


router.get("/:index/next", new Auth(2).token, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {id: "index"});
    const index = v.get("path.index");
    const art = await Flow.getArt(
        {
            where: {index: index + 1}
        },
        "noTime"
    );
    ctx.body = art;
});


router.get("/:index/previous", new Auth(2).token, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {id: "index"});
    const index = v.get("path.index");
    const art = await Flow.getArt(
        {
            where: {index: index - 1}
        },
        "noTime"
    );

    ctx.body = art;
});

//为什么要这个API？分化逻辑，期刊的详细内容是死的，点赞取消赞是动态的信息。
// 死板的信息放前端缓存，性能优化！避免二次请求。请求越少，性能越好！
//动态数据实时性，所以，必须要实时来拿到的。
//数据：路由里，拿到要用path不是body。
//坑：body里的数据，是json，数值是数字字符串的，不会变。
// 而path里的数据都是字符串！如果要转成数字，一定要记得！

router.get("/:type/:id/favor", new Auth(2).token, async ctx => {
    //验证 type ,id ，都是字符串！在path里！
    //跟likeVilidator很像：但是有区别的，源于一个是body的json，一个是path的字符串：
    // id的验证，不用担心，强制转化为数字，但是type 的有问题的！
    const v = await new LikeClassicValidator("path",'likeClassicValidator').validate(ctx);
    //强制转化path的参数为数字，否则会是字符串，因为校验器那里没有强制转换！
    const type = +v.get("path.type");
    const id = v.get("path.id");
    const art = await Art.getData(type, id);
    if (!art) {
        throw new NotFound();
    }
    const favor = await Favor.findOne({
        where: {art_id: id, type, uid: ctx.auth.uid}
    });
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: Boolean(favor),
    };
});

export default router;
// export {latest};