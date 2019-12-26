import {Validator, Rule} from "../../core/validatorV2";
import User from "../model/user";


class RegisterValidator extends Validator {
    constructor() {
        super();
        this.nickname = [
            new Rule("isLength",
                "用户名最少4个字符，最长32个字符！",
                {min: 4, max: 32})
        ];
        this.email = [
            new Rule("isEmail", "输入的邮箱格式不正确！")
        ];
        this.password1 = [
            new Rule("isLength", "密码至少6个字符，最大32个字符！", {
                min: 6, max: 32
            }),
            new Rule(
                "matches", "密码需要用数字，字母两种字符混合",
                "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]"
            )
        ];
        this.password2 = this.password1;
    }

    async validatePassword(vals) {   //自定义校验方法，方法名以validate开头就可以的。
        const pwd1 = vals.body.password1;
        const pwd2 = vals.body.password2;
        if (pwd2 !== pwd1) {
            throw new Error("两次输入的密码不相同！");
        }
    }

    async validateEmail(vals) {
        const eml = vals.body.email;
        const user = await User.findOne({
            where:{email: eml}
        });
        console.log(user,555);
        if (user) {
            throw new Error("邮箱已存在！");
        }
    }
}

export default RegisterValidator;