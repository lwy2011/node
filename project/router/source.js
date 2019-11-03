import express from "express";
import Source from "../model/source";

const router = express.Router();

router.get("/", (req, res, next) => {
    Source.find({}, (e, lists) => {
        if (e) return next(e);
        res.render("back/source.html", {lists});
    });
});
router.get("/add", (req, res) => {
    res.render("back/source.add.html");
});
router.get("/edit/:id", (req, res, next) => {
    Source.findById(req.params.id, (e, data) => {
        if (e) return next(e);
        res.render("back/source.edit.html",{data});
    });
});


export default router;