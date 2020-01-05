import {Music, Sentence, Movie} from "./classic";

class Art {
    static async getData(type, art_id) {
        const filter = {where: {id: art_id}};
        let data;
        switch (type) {
            case 100:
                data = await Movie.findOne(filter);
                break;
            case 200:
                data = await Music.findOne(filter);
                break;
            case 300:
                data = await Sentence.findOne(filter);
            default:
                break;
        }
        return data;
    }
}

export default Art;