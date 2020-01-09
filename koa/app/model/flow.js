//对movie,music ,sentence的共性的抽象表，期刊属性的汇总


import sequelize from "../../core/db";
import {Model, Sequelize} from "sequelize";
import Art from "./art";

class Flow extends Model {
    static async getArt(filters,uid, scope) {
        const flow = await Flow.findOne(filters);
        //类里面的方法们，加了static修饰后，实例是不能依赖委托引用的！

        const obj = await new Art(flow.type, flow.art_id).getDataWithFavor(uid, scope);
        //这时候返回的art是个对象，obj.art是art数据包，有setDataValue的方法！
        obj.art.setDataValue("index", flow.index);
        return obj;
    }
}

Flow.init(
    {
        index: Sequelize.INTEGER,
        art_id: Sequelize.INTEGER,  //各个表的数据包的id
        type: Sequelize.INTEGER,
        status: Sequelize.INTEGER
        // type:1 ,movie , 2 ,music,3,sentence
    }, {sequelize, tableName: "flow"}
);


export default Flow;