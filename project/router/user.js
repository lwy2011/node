import express from "express";


const router = express.Router();

router.get("/back/login", (req, res) => {
    res.render('back/login.html')
});
router.get("/back/user_center", (req, res) => {
    res.render('back/user_center.html')
});
router.get("/back/user_reset_pwd", (req, res) => {
    res.render('back/user_reset_pwd.html')
});

export default router;