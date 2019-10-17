var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>{    //跳转失败的原因找到了，就是这里不需要再 'login'作为参数了，默认的参数是'/',二级路由应该才要加参数，，，猜的！
    console.log(1);
    res.render('login_register',{path:'login'});
});

module.exports = router;