import Router from "koa-router";
import requireDirectory from "require-directory";

import {join} from "path";
import config from "../config.js";


//router目录变量化

// process.cwd()绝对路径的方法

export default class InitManager {
    static init(app) {
        global.config = config;    //全局化变量
        InitManager.initLoadRouters(app);
    }

    static initLoadRouters(app) {
        const whenLoadModule = val => {
            // console.log(val);
            for (let key in val) {
                val[key] instanceof Router && app.use(val[key].routes());
            }
        };
        requireDirectory(
            module, join(__dirname, "../app/router"),
            {visit: whenLoadModule}
        );
    }
}


