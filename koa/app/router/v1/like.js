//点赞
import Router from "koa-router";
import Auth from "../../../middlewares/auth";

const router = new Router({prefix: "/v1/classic"});


router.post("/like", new Auth(2).token, async (ctx) => {

});


export default router;