import express from "express";

const router = express.Router();
//后端路由

router.get("/back", (req, res) => {
    res.render("back/index.html");
});




//前端路由
router.get("/", (req, res) => {
    res.redirect('/web');
});

router.get("/web", (req, res) => {
    res.render("web/index.html");
});



export default router;