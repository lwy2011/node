import {Model,Sequelize} from "sequelize";
import sequelize from "../../core/db";


class HotBook extends Model {
    static async getAll(){
        const books = await HotBook.findAll({order:['index']})

        //拿到所有的
    }
}

HotBook.init(
    {
        index:Sequelize.INTEGER,  //排序做的，排序字段
        title:Sequelize.STRING,
        image:Sequelize.STRING,
        author:Sequelize.STRING,
    },{sequelize,tableName:'hot_book'}
)

export default HotBook