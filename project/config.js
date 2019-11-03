import {join} from 'path'
export default {
    viewPath : join(__dirname,'./views'),
    publicPath:join(__dirname,'./public'),
    uploadImgPath:join(__dirname,'./public/uploadImgs'),
    uploadImgPathHelper : '/uploadImgs/',
    user_md5_key:"@#@%$#WEEWWR322dssdaE3$Gs",
    uploadAvatarPath : join(__dirname,'./public/uploadAvatar'),
    uploadAvatarPathHelper : '/uploadAvatar/',
    uploadSourcePath : join(__dirname,'./public/upload_source_img'),
    uploadSourcePathHelper : '/upload_source_img/',
    uploadSourceCoverPath : join(__dirname,'./public/upload_source_cover'),
    uploadSourceCoverPathHelper : '/upload_source_cover/'
}

//这是设置静态文件路径