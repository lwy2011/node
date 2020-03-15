import PositiveIntegerValidator from "./positiveInteger";
import LoginType, {ClassicType} from "../../core/enum";

//点赞业务的参数校验：type,art_id
class LikeValidator extends PositiveIntegerValidator {
    constructor(key = "body", validatorType = "likeValidator") {
        super();
        const enumType = {
            likeValidator: LoginType,
            likeClassicValidator: ClassicType
        };
        const types = enumType[validatorType];
        // console.log(types,111,validatorType);
        this.validateType = vals => {
            // console.log(vals,666);
            let {type} = vals[key];
            console.log(type,666);

            if (!type) {
                throw new Error("type是必须参数！");
            }
            console.log(vals[key],types,type);
            if (!types.isThisType(key === "path" ? +type : type)) {
                throw new Error("type参数不合法");
            }
        };
    }
}


export default LikeValidator;