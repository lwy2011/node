import express from "express";
import Source from "../model/source";


const router = express.Router();

router.get("/", (req, res) => {
    res.render("web/source.html");
});

router.get("/count", (req, res, next) => {
    Source.countDocuments((e, count) => {
        if (e) return next(e);
        res.json({
            status: 200,
            count
        });
    });
});

router.get("/lazy", (req, res, next) => {
    const {page, count, sortBy} = req.query;
    const sort = {[sortBy]: -1};
    console.log(sort,page,count,123);
    Source.find({}, "title img_url price link").sort(sort)
        .skip((+page - 1) * (+count)).limit(+count).exec(
        (e, lists) => {
            if (e) return next(e);
            res.json({
                status: 200,
                lists
            });
        }
    );
});
export default router;