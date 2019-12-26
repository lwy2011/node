//sequelise 需要安装 mysql2这种mysql驱动配套，还有其他的驱动配套，看文档
// https://sequelize.org/v5/manual/getting-started.html


import Sequelize from "sequelize";

const {
    name, user, password, host, port
} = global.config.database;

const sequelize = new Sequelize(
    name, user, password,
    {
        dialect: "mysql",
        host,
        port,
        logging: true,   //原始的数据库操作，可显示细节！
        timezone: "+08:00", //纠正为北京时间
        define: {}
    }
);


export default sequelize;