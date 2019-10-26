//轮播图路由
import express from "express";

const router = express.Router();

router.get("/imgs", (req, res) => {

});


router.post("/imgs", (req, res) => {
    console.log(req.body);
});


export default router;