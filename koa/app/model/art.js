import {Music, Sentence, Movie} from "./classic";
import {NotFound} from "../../core/http-exception";
import Favor from "./favor";
// import Flow from "./flow";

class Art {
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
            default:
                break;
        }
        if (!data) {
            throw new NotFound();
        }
        return data;
    }
//所以的跟art详情的数据请求,都需要拿到当前用户到底点没点赞：
    static async getDataWithFavor(type, art_id, uid, scopeNeed = null) {
        const art = await this.getData(type, art_id, scopeNeed);
        const favor = await Favor.findOne(
            {where: {type, art_id, uid}}
        );
        art.setDataValue("like_status", Boolean(favor));
        return art;
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
}

export default Art;