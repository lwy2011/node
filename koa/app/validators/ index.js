import {Validator, Rule} from "../../core/validator";


class PositiveIntegerValidator extends Validator {  //正整数校验
    constructor() {
        super();
        this.id = [   //多个验证条件
            new Rule("isInt", "id参数需要为正整数", {min: 1})
        ];
    }
}


export default PositiveIntegerValidator;