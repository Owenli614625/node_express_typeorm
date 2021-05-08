var express = require('express');
let moment = require('moment');
var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var path = require('path');
var config = require('../config.js');
var router = express.Router();

var storagemy = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        let folderName=req.body.folder;
        //创建一级目录123
        var pathstr = path.join(__dirname+'/../uploads/');
        if (fs.existsSync(pathstr)) {
        } else {
            fs.mkdirSync(pathstr);
        }

        //创建二级目录
        pathstr = path.join(__dirname+'/../uploads/'+folderName);
        
        if (fs.existsSync(pathstr)) {
        } else {
            fs.mkdirSync(pathstr);
        }
        // console.log("===============");
        // console.log(pathstr);
        // console.log("===============");
        cb(null, pathstr);
    },
    filename: function (req:any, file:any, cb:any) {
        let folderName=req.body.folder;
        var pathstr = path.join(__dirname+"/../uploads/" +folderName+"/"+ moment().format('YYYYMMDD'));
        // console.log("++++++++++++++++++++");
        // console.log(pathstr);
        // console.log("++++++++++++++++++++");
        if (fs.existsSync(pathstr)) {
            cb(null, moment().format('YYYYMMDD') + "/" + `${Date.now()}-${file.originalname}`)

        } else {
            fs.mkdirSync(pathstr);
            cb(null, moment().format('YYYYMMDD') + "/" + `${Date.now()}-${file.originalname}`)
        }


    }
})
var uploadmy = multer({ storage: storagemy });


/**
 * 上传文件
 * @group 文件上传接口
 * @route POST /file/upload
 * @summary 上传文件
 * @param {file} folderName.formData  要存放的文件夹名称{用户可以自定义}
 * @param {file} files.formData  文件
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
 router.post('/upload', uploadmy.any(), function (req:any, res:any) {
    // 读取上传的图片信息
    let folderName=req.body.folder;
    // console.log(folderName);
    // console.log(req.files);
    res.json({
        code: 200,
        message: 'true',
        url: config.url + "/uploads/"+folderName +"/"+ req.files[0].filename,
        file: req.files[0].filename
    });

})

module.exports = router;   /*暴露这个 router模块*/