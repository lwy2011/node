//sequelise 需要安装 mysql2这种mysql驱动配套，还有其他的驱动配套，看文档
// https://sequelize.org/v5/manual/getting-started.html
import config from "../config.js";

import {Sequelize, Model} from "sequelize";
import {clone, unset} from "lodash";

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
            timestamps: true,
            //delete_time 软删除
            paranoid: true,
            //命名修改
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at",
            //不要驼峰命名
            underscored: true,

            //如何预定义查询时，过滤一些字段？用到scope,它用在model层次，
            // 但是全局层次过滤，用到sequelize实例层次！
            scopes: {
                noTime: {
                    attributes: {
                        exclude: ["created_at", "updated_at", "deleted_at"]
                    }
                }
            }
        }     //私人订制参数设置


    }
);
//定义过滤器方法,用于各个接口的查询方法层次，灵活定制，去除字段！
Model.prototype.toJSON = function () {
    //用clone ,因为去除的一般都是简单的数据字符，不需要深拷贝,节省性能，拷贝是为了避免除去的时候，操作对源数据进行操作。
    const data = clone(this.dataValues);
    unset(data, "created_at");
    unset(data, "updated_at");
    unset(data, "deleted_at");
    (Array.isArray(this.exclude)) && this.exclude.map(
        key => key && unset(data, key)
    );
    return data;
};

sequelize.sync({   //数据迁移是生产阶段要做的，一定要小心，最好人为做出来！
                   //force:Boolean(config.environment === 'dev')    ,//开发阶段，数据库设置改变，自动删除所有数据，重新建表。生产阶段必须要
});   //必须要加上！传模型自动,
export default sequelize;
