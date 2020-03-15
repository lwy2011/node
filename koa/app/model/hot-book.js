import {Model, Sequelize} from "sequelize";
import sequelize from "../../core/db";
import Favor from "./favor";


class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({order: ["index"]});
        //拿到所有的，注意index 就是顺序的依据！默认是id。
        // 这时候，要拿到所有的图书的点赞数量！一本书可以很多的用户点赞的，这是个难点！
        const ids = [];
        books.map(item => ids.push(item.id));
        //需要数的点赞数：[{art_id,count}]
        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Sequelize.Op.in]: ids
                },
                type: 400
            },
            group: ["art_id"],
            //这个是分组的形式展示{id1:[{},{}...],id2:[{},{}...]}
            attributes: ["art_id", [Sequelize.fn("COUNT", "*"), "count"]]
            //决定结果有哪些字段的，我想要{id1:{count:xx},id2:{count:ttt}...}
        });
        const obj = {};
        favors.map(
            item => {
                obj["" + item.art_id] = item;
            }
        );
        // console.log('o',444,obj);
        books.map(
            book => {
                const favor = obj["" + book.id];
                //操作数据库模型的实例，一定要用set,get。
                book.setDataValue("count", favor ? favor.get("count") : 0);
                // console.log(book.get('id'),22);
                return book;
            }
        );
        return books;
    }
}

HotBook.init(
    {
        index: Sequelize.INTEGER,  //排序做的，排序字段
        title: Sequelize.STRING,
        image: Sequelize.STRING,
        author: Sequelize.STRING,
    }, {sequelize, tableName: "hot_book"}
);

export default HotBook;