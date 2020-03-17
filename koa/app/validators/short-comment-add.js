import {Validator, Rule} from "../../core/validatorV2";
import PositiveIntegerValidator from "./positiveInteger";


class ShortCommentAddValidator extends PositiveIntegerValidator {  //正整数校验
    constructor() {
        super();
        this.content = [   //多个验证条件
            new Rule("isLength", "content的字符长度为1-24个字符", {
                min: 1, max: 24
            })
        ];
    }
}


export default ShortCommentAddValidator;