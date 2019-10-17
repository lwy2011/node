const express = require("express");

const router = express.Router();


router.get("/", (req, res) => {
    res.render("login_register",{path:'register'});
});

module.exports = router;