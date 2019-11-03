import express from "express";
import formidable from "formidable";
import config from "../config";
import {basename} from "path";
import Source from "../model/source.js";

const router = express.Router();

const createForm = (path) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path;
    return form;
};
router.post("/img_upload", (req, res, next) => {
    // const form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    // form.uploadDir = config.uploadSourcePath;
    const form = createForm(config.uploadSourcePath);
    form.parse(req, (e, fields, files) => {
        console.log(e, files, fields);

        if (e) return next(e);
        res.json({
            status: 200,
            path: config.uploadSourcePathHelper + basename(files.img.path)
        });
    });
});

router.post("/add", (req, res, next) => {
    const form = createForm(config.uploadSourceCoverPath);
    form.parse(req, (e, fields, files) => {
        // if(e) return next(e);
        if (e) return next(e);
        console.log(11, fields, files, 11);
        try {
            const {path} = files.img_url;
            fields.img_url = config.uploadSourceCoverPathHelper + basename(path);
            const source = new Source(fields);
            source.save((err, docs) => {
                if (err) return next(err);
                res.json({
                    status: 200,
                    data: docs
                });
            });
        } catch (err) {
            console.log(err);
        }


    });
});
router.post("/edit/:id", (req, res, next) => {
    const form = createForm(config.uploadSourceCoverPath);
    form.parse(req, (e, fields, files) => {
        // if(e) return next(e);
        if (e) return next(e);
        console.log(1122, fields, files, 1122);

        let path = files && files.img_url && files.img_url.path;
        path && (
            fields.img_url = config.uploadSourceCoverPathHelper + basename(path)
        );
        fields.l_edit = new Date().toLocaleString();
        Source.findById(req.params.id, (err, data) => {
            if (err) return next(err);
            console.log(data, req.params.id);

            Object.keys(fields).map(
                key => data[key] = fields[key]
            );
            data.save((e1, docs) => {
                if (e1) return next(e1);
                res.json({
                    status: 200,
                    data: docs
                });
            });
        });

    });
});
export default router;