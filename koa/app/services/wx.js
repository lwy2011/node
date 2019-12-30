//也是业务层，等同于model文件夹里的其他业务，为了展示业务分层，
// 做了services层

import config from "../../config";
import util from "util";
import axios from "axios";
import {AuthFailed} from "../../core/http-exception";

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
    }
}


export default Wx;