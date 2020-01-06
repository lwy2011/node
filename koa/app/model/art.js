import {Music, Sentence, Movie} from "./classic";

class Art {
    static async getData(type, art_id,scopeNeed = null) {
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
            default:
                break;
        }
        return data;
    }
}

export default Art;