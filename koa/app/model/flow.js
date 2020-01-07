//对movie,music ,sentence的共性的抽象表，期刊属性的汇总


import sequelize from "../../core/db";
import {Model, default as Sequelize} from "sequelize";
import Art from "./art";

class Flow extends Model {
    static async getArt(filters,uid, scope) {
        const flow = await Flow.findOne(filters);
        const art = await Art.getDataWithFavor(flow.type, flow.art_id,uid, scope);
        art.setDataValue("index", flow.index);
        return art;
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