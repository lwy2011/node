import express from "express";
import Source from "../model/source";

const router = express.Router();

// router.get("/", (req, res, next) => {
//     Source.find({}, (e, lists) => {
//         if (e) return next(e);
//         res.render("back/source.html", {lists});
//     });
// });
router.get("/add", (req, res) => {
    res.render("back/source.add.html");
});
router.get("/edit/:id", (req, res, next) => {
    Source.findById(req.params.id, (e, data) => {
        if (e) return next(e);
        res.render("back/source.edit.html", {data});
    });
});

router.get("/", (req, res) => {
    let {count, page} = req.query;
    count = +req.query.count || 2;
    page = +req.query.page || 1;
    Source.find().skip((page - 1) * count).limit(count).exec(
        (e, lists) => {
            if (e) return e;
            Source.countDocuments(
                (e1, c) => {
                    if (e1) return e1;
                    res.render("back/source.html",
                        {
                            lists,
                            totalPage: Math.ceil(c / count),
                            page,
                            count
                        }
                    );
                }
            );

        }
    );
});

export default router;