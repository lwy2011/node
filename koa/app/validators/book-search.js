import {Validator, Rule} from "../../core/validatorV2";


class BookSearchValidator extends Validator {  //正整数校验
    constructor() {
        super();
        // key  1-32长度；分页，多少条？start>=0,count<20,传不传。
        this.q = [
            new Rule("isLength", "搜索关键字不能为空！", {
                min: 1, max: 16
            })
        ];
        this.start = [
            new Rule("isInt", "start不能为空", {
                min: 1, max: 60000
            }),
            new Rule("isOptional", "", 1)
        ];
        this.count = [
            new Rule("isInt", "count不合规范", {
                min: 1, max: 20
            }),
            new Rule(
                "isOptional", "", 20
            )
        ];
    }
}


export default BookSearchValidator;