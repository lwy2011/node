const config = {
    environment: 'dev' , //prod开发生产环境，可以做全局错误处理的区别，开发环境，错误需要抛出了。
    database:{
        name : 'koa2',
        user:'root',
        password:'kk201101',
        host:'localhost',
        port:3306
    },
    security:{
        secretKey:'sjf$nweis2331mk',
        expiresIn:60*60  //单位为分钟，jsonwebtoken的生态
    }
};

export default config;