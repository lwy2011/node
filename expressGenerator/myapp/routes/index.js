var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>{
  console.log(1);
  res.render('index');
});

module.exports = router;
