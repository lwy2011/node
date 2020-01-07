//获取某一个classic的点赞数量和当前用户是否点赞了的状态：
//动态的数据逻辑：验证：type , id ,在path中拿到：

import LikeValidator from "./like";

class LikeClassicValidator extends LikeValidator {
    constructor(key){
        super(key)
    }
}

export default LikeClassicValidator;