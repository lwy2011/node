//也是业务层，等同于model文件夹里的其他业务，为了展示业务分层，
// 做了services层

import config from "../../config";
import util from "util";
import axios from "axios";
import {AuthFailed} from "../../core/http-exception";
import User from "../model/user";
import Auth from "../../middlewares/auth";
import {generateToken} from "../../core/util";

class Wx {
    async codeToToken(code) {
        //登录原理：
        //前端生成和发送code，接受到code，
        // 后端把code , appid , appsecret ,code 发送给wechat http API
        //微信服务器返回了session_key ,openid等
        //     自定义登录态跟openid ,session_key关联。

        // 不需要注册，openid是唯一标识
        //     appid appsecret小程序申请的
        const {appUrl, appId, appSecret} = config.wx;
        const url = util.format(appUrl, appId, appSecret, code);
        const res = await axios.get(url);
        if (res.status !== 200) {
            throw new AuthFailed("openid获取失败！");
        }

        if (res.errcode !== 0) {
            throw new AuthFailed(res.errmsg, res.errcode);
        }
        //openid 很重要，唯一标识！要很机密的，所以，不能把它作为验证身份，那就把它存到本地的User数据库中，
        // 建立openid与uid 的映射

        //openid要写入到数据库中去，但是数据库中如果有了，就不需要写入了。
        // 先查询，要不要写入
        // 在User模型中集成数据库的操作方法，而不是这里。

        let user = User.verifyWxOpenId(res.openid);
        if (!user) {
            user = User.wxOpenidCreate(res.openid);
        }
            //这里就把openid写入了或者拿到openid的数据了。
        //下面就是要生成token 了！
        return generateToken(user.id,Auth.USER)
    }
}


export default Wx;