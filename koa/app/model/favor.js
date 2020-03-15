import {Model, Sequelize} from "sequelize";
import sequelize from "../../core/db";
import {DislikeError, LikeError, NotFound} from "../../core/http-exception";
// import Flow from "./flow";
import Art from "./art";


class Favor extends Model {
    static async like(art_id, type, uid) {
        //操作 flow 表，然后操作 favor 表
        //两个表要同时成功或者同时失败才可以的！
        //数据库事务：能保证同时操作几个表，同时成功或失败，数据一致性！
        //数据一致性！
        //数据库原则： ACID ：原子性，一致性，隔离性，持久性

        //检查是否已经点赞了：
        const favor = await Favor.findOne({
            where: {art_id, type, uid}
        });
        console.log(art_id, type, uid, favor, "ff");
        if (favor) {
            throw new LikeError();
        }

        //Sequelize 的事务处理：https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/transactions.md
        if (type === 400) return (await Favor.create({art_id, uid, type}));
        return sequelize.transaction(async t => {
            //各个表的操作：
            //计入 用户跟art的关系！
            await Favor.create({art_id, uid, type}, {transaction: t});
            //对art的具体的model的包的点赞数加一：
            const art = await Art.getData(type, art_id);
            await art.increment("fav_nums", {by: 1, transaction: t});

        });

    }

    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {art_id, type, uid}
        });
        console.log(art_id, type, uid, favor, "ff");

        if (!favor) {
            throw new DislikeError();
        }

        //Sequelize 的事务处理：https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/transactions.md
        if (type === 400) return (await favor.destroy());

        return sequelize.transaction(async t => {
            //各个表的操作：
            await favor.destroy({
                force: true, transaction: t
            });
            const art = await Art.getData(type, art_id);
            await art.decrement("fav_nums", {by: 1, transaction: t});
        });
    }

    static async getClassicFav(uid) {
        //uid,type = 100 ,200,300,book = 400
        const favor = await Favor.findAll(
            {
                where: {
                    uid,
                    type: {
                        [Sequelize.Op.not]: 400  //Op需要用到Sequelize的
                    }
                }
            }
        );
        // console.log(favor, uid);
        if (!favor.length) {
            throw new NotFound("您还没有添加喜欢哦！", 201);
        }
        const getIds = {
            100: [],
            200: [],
            300: []
        };
        favor.map(
            vals => {
                getIds[vals.type].push(vals.art_id);
            }
        );
        return getIds;
    }
}

//业务表，抽象出来点赞的 表，把点赞的用户跟点赞的作品关联起来了。
Favor.init({
    type: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    uid: Sequelize.INTEGER
}, {sequelize, tableName: "favor"});


export default Favor;