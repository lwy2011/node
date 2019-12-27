import {Validator, Rule} from "../../core/validatorV2";
import LoginType from "../../core/enum";


class TokenValidator extends Validator {
    constructor() {
        super();
        this.account = [
            new Rule("isLength", "账号至少4个字符，最大32个字符", {min: 4, max: 32})
        ];
        this.secret = [
            //密码可以传，可以不传！传就要校验
            new Rule("isOptional"),//isOptional是自定义的函数，专门处理传不传的逻辑处理
            new Rule("isLength", "密码至少6个字符！", {min: 6, max: 128})
        ];
    }

    //type  ,枚举，模拟枚举，手机号，账号，邮箱，等登陆方式，对象模拟枚举
    // 自定义函数校验type
    validateType(vals) {
        if (!vals.body.type) {
            throw new Error("登陆的type是必需要有的！");
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error("type参数不合法！");
        }
    }
}


export default TokenValidator;