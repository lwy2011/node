//sequelise 需要安装 mysql2这种mysql驱动配套，还有其他的驱动配套，看文档
// https://sequelize.org/v5/manual/getting-started.html
import config from '../config.js'

import {Sequelize} from "sequelize";

const {
    name, user, password, host, port
} = config.database;

const sequelize = new Sequelize(
    name, user, password,
    {
        dialect: "mysql",           //数据库类型
        host,
        port,
        logging: true,   //原始的数据库操作，可显示细节！
        timezone: "+08:00", //纠正为北京时间
        define: {
            //create_time update_time
            timestamps:true,
            //delete_time 软删除
            paranoid:true,
            //命名修改
            createdAt:'created_at',
            updatedAt:'updated_at',
            deletedAt:'deleted_at',
            //不要驼峰命名
            underscored:true
        }      //私人订制参数设置
    }
);

sequelize.sync({   //数据迁移是生产阶段要做的，一定要小心，最好人为做出来！
    force:Boolean(config.environment === 'dev')    ,//开发阶段，数据库设置改变，自动删除所有数据，重新建表。生产阶段必须要
});   //必须要加上！传模型自动,
export default sequelize;
