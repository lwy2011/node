const config = {
    environment: "dev", //prod开发生产环境，可以做全局错误处理的区别，开发环境，错误需要抛出了。
    database: {
        name: "koa2",
        user: "root",
        password: "kk201101",
        host: "localhost",
        port: 3306
    },
    security: {
        secretKey: "sjf$nweis2331mk",
        expiresIn: 60 * 60  //单位为分钟，jsonwebtoken的生态
    },
    wx: {
        appId: "wxe55e7cab546ee4c8",
        appSecret: "7f90b018dd79ea54cd05308bec06c53c",
        appUrl: `https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code`
    },
    book: {
        detail: "http://t.yushu.im/v2/book/id/%s",
        keyword: "http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s"
    }
};

export default config;