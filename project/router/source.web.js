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
    console.log(sort, page, count, 123);
    Source.find({}, "title img_url price id").sort(sort)
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

router.get(
    "/:id", (req, res, next) => {
        const {id} = req.params;
        Source.findById(id, "-img_url -link -_v ", (e, data) => {
            if (e) return next(e);
            res.render("web/source.detail.html", {data});
        });
    }
);
router.get("/read/:id", (req, res, next) => {
    Source.findById(req.params.id, (e, data) => {
        if (e) return next(e);
        data.read_count += 1;
        data.save(
            (err, docs) => {
                if (err) return next(err);
                res.json({
                    status: 200,
                    count: docs.read_count,
                });
            }
        );
    });
});
export default router;