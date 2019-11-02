import express from "express";
import formidable from "formidable";
import config from "../config";
import {basename} from 'path'
const router = express.Router();

router.post("/img_upload", (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = config.uploadSourcePath;

    form.parse(req, (e, fields, files) => {
        if (e) return res.json({
            status: 1, message: e.message || "图片上传失败！请重试！"
        });
        console.log(files, fields);
        res.json({
            status:200,
            path: config.uploadSourcePathHelper + basename(files.img.path)
        })
    });
});

export default router;