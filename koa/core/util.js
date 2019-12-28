const jwt = require("jsonwebtoken");
/***
 *
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return [];

        let names = Reflect.ownKeys(instance);
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name);
        });

        return [...names, ..._find(instance.__proto__)];
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true;
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true;
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true;
    }

    return _find(instance);
};


//生成token的方法！
const generateToken = function (uid, scope) {
    const secretKey = global.config.security.secretKey;  //随机字符串做私有钥匙
    const expiresIn = global.config.security.expiresIn;  //过期时间，分钟做单位
    const token = jwt.sign(
        {                //写入的信息数据
            uid,
            scope
        },
        secretKey,    //私钥
        {              //其他的配置参数
            expiresIn
        });
    return token;
};


export {
    findMembers,
    generateToken,
};