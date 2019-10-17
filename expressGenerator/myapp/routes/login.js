// var express = require("express");
// var router = express.Router();
//
// /* GET users listing. */
// router.get("/login", (req, res)=> {
//     console.log("login");
//     res.render("login");
// });
//
// module.exports = router;


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;