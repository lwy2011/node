import {Music, Sentence, Movie} from "./classic";
import {NotFound} from "../../core/http-exception";
import Favor from "./favor";
import {Sequelize} from "sequelize";
import Book from "./book";

// import Flow from "./flow";

class Art {
    constructor(type, id) {
        this.type = type;
        this.id = id;
    }

    static async getData(type, art_id, scopeNeed = null) {
        const filter = {where: {id: art_id}};
        //scope 是预定义的过滤，过滤返回的数据的key们，
        // 因为点赞功能需要不能过滤时间类的key，否则报错，sequelize的bug。
        let data;
        switch (type) {
            case 100:
                data = await Movie.scope(scopeNeed).findOne(filter);
                break;
            case 200:
                data = await Music.scope(scopeNeed).findOne(filter);
                break;
            case 300:
                data = await Sentence.scope(scopeNeed).findOne(filter);
                break;
            case 400:
                data = await Book.scope(scopeNeed).findOne(filter);
                if (!data) {
                    // console.log(art_id,{id: art_id},99);
                    data = await Book.create({id: art_id});
                }
                break;
            default:
                break;
        }
        if (!data) {
            throw new NotFound();
        }
        // data.exclude = ['index','image']
        return data;
    }

//所以的跟art详情的数据请求,都需要拿到当前用户到底点没点赞：
    async getDataWithFavor(uid, scopeNeed = null) {
        //不加static的方法，会被实例委托引用到，加了的，只能通过Art.getData引用！
        const art = await Art.getData(this.type, this.id, scopeNeed);
        //为了防止循环引用：如果是CommonJS的规范，这里会出bug的。import ES6还是比较安全的！

        const favor = await Favor.findOne(
            {
                where: {type: this.type, art_id: this.id, uid}
            }
        );
        return {art, like_status: Boolean(favor)};
    }


    //这是期刊某一个的详情的：很迷惑，到底要不要根据是第几期来做这个，否则还要查一个第几期的表：
    // static async getAllData(type, art_id, uid, scopeNeed = null) {
    //     const art = await this.getDataWithFavor(
    //         type, art_id, uid, scopeNeed = null
    //     );
    //     const flow = Flow.findOne(
    //         {where:{type, art_id}}
    //     );
    //     art.setDataValue("index", flow.index);
    //     return art;
    // }

    //获取用户喜欢的所有的：
    static async getAllArts(idsObj) {
        let arts = [];

        for (let key in idsObj) {
            if (idsObj[key].length) {
                const lists = await this.getTypeArts(idsObj[key], key);
                // console.log(lists);
                arts = arts.concat(lists);
            }
        }
        // arts.exclude = ['image']这里设置，不会成功的，因为需要在数组里的各个art的实例加这个属性的！
        //有种方法是在art的各个原型上加，比如：Movie.prototype.exclude = ['image']，但是就写死了！
        //最好是在实例上加，这样才私有化，灵活可定制。
        // arts.map(
        //     art => art.exclude = ["image"]
        // );  成功了！
        return arts;
    }

    static async getTypeArts(ids, type) {
        let arts;
        const filter = {
            where: {
                id: {
                    [Sequelize.Op.in]: ids
                }
            }
        };
        switch (+type) {
            case 100 :
                arts = await Movie.findAll(filter);
                break;
            case 200:
                arts = await Music.findAll(filter);
                break;
            case  300:
                arts = await Sentence.findAll(filter);
        }
        return arts;
    }
}

export default Art;