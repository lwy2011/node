import PositiveIntegerValidator from "./positiveInteger";
import LoginType from "../../core/enum";

//点赞业务的参数校验：type,art_id
class LikeValidator extends PositiveIntegerValidator {
    constructor() {
        super();
        this.validateType = vals => {
            const {type} = vals.body;
            if (!type) {
                throw new Error("type是必须参数！");
            }
            if (!LoginType.isThisType(type)) {
                throw new Error("type参数不合法");
            }
        };
    }
}


export default LikeValidator;