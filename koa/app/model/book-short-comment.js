import {Model, Sequelize} from "sequelize";
import sequelize from "../../core/db";


class BookShortComment extends Model {
    static async add(content, book_id) {
        const data = await BookShortComment.findOne(
            {
                where: {
                    content, book_id
                }
            }
        );
        if (data) {
            return (await data.increment("favor_nums", {by: 1}));
        } else {
            return (await BookShortComment.create({
                content, book_id
            }));
        }
    }

    static async getBookComments(book_id) {
        return (await BookShortComment.findAll({
            where: {
                book_id
            }
        }));
    }
    // toJSON() {
    //     return {
    //         book_id:this.getDataValue('book_id'),
    //         content:this.getDataValue('content'),
    //         favor_nums:this.getDataValue('favor_nums')
    //     }
    // }
}

BookShortComment.init({
    content: Sequelize.STRING,
    book_id: Sequelize.INTEGER,
    favor_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {sequelize, tableName: "short_comment"});

export default BookShortComment;