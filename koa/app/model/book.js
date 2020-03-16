//这里是业务表，只是为了存储书籍的收藏数据而存在的。
import sequelize from "../../core/db";
import {Model, Sequelize} from "sequelize";
import util from "util";
import axios from "axios";

class Book extends Model {
    constructor(id) {
        super();
        this.id = id;
    }

    async detail() {
        const url = util.format(global.config.book.detail, this.id);
        return (await axios.get(url)).data;
    };
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true    //人为赋值，因为这里是个业务表，只是为了存储fav_nums的。
        //书籍的真的id是从书籍的基础数据库拿到的书籍id。
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        default: 0
    }
}, {sequelize, tableName: "book"});

export default Book;