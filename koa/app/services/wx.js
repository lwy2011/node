//也是业务层，等同于model文件夹里的其他业务，为了展示业务分层，
// 做了services层

class Wx {
    codeToToken(code){
        //登录原理：
        //前端生成和发送code，接受到code，
        // 后端把code , appid , appsecret ,code 发送给wechat http API
    //微信服务器返回了session_key ,openid等
    //     自定义登录态跟openid ,session_key关联。

    // 不需要注册，openid是唯一标识
    //     appid appsecret小程序申请的
    }
}



export default Wx