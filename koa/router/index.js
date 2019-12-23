// 路由系统结构建立：
// 1主题划分，主题关联，
// 1.1先核心主题，再发散出去，业务模型
// 2数据库设计，也关联主题


// api版本：业务变更！兼容老版本！一般支持3个版本！
// 版本号作为标识符！路径，查询参数，header里
// 开闭原则：尽量不修改，尽量扩展代码！


import Router from "koa-router";


const router = new Router();


export default router;