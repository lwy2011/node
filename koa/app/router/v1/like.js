//点赞
import Router from "koa-router";
import Auth from "../../../middlewares/auth";
import LikeValidator from "../../validators/like";
import Favor from "../../model/favor";
import {Success} from "../../../core/http-exception";

const router = new Router({prefix: "/v1/classic"});


router.post("/like", new Auth(2).token, async (ctx) => {
    //前端传的数据：第一步，参数验证：type,art_id
    const v = await new LikeValidator().validate(ctx,{id:'art_id'});
    await Favor.like(
        v.get("body.art_id"),
        v.get("body.type"),
        ctx.auth.uid    //这里为什么不让前端传，因为怕前端瞎传！修改uid号，拿到了别人的数据！
    );
    throw new Success();
});
router.post("/dislike", new Auth(2).token, async (ctx) => {
    //前端传的数据：第一步，参数验证：type,art_id
    const v = await new LikeValidator().validate(ctx,{id:'art_id'});
    await Favor.dislike(
        v.get("body.art_id"),
        v.get("body.type"),
        ctx.auth.uid    //这里为什么不让前端传，因为怕前端瞎传！修改uid号，拿到了别人的数据！
    );
    throw new Success();
});

export default router;