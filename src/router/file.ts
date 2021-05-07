var express = require('express');
import { copyFileSync } from "fs";
import { Status } from "../base/statue";
const status = new Status();
var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var path = require('path');
var router = express.Router();


    /**
     * 文件上传
     * @group 文件上传接口
     * @route POST /paymentInfo/add
     * @summary 文件上传 
     * @param {string} Cookie.header                  用户登录cookie
     * @param {string} folder.formData                文件夹名称
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     var upload = multer({dest: __dirname+'/../public/upload_tmp/'});
     
     router.post('/upload', upload.any(), function(req:any, res:any) {
         console.log(req.files[0]);  // 上传的文件信息
     
         var des_file = __dirname+"/../public/upload_tmp/" + req.files[0].originalname;
         console.log(des_file);
         fs.readFile( req.files[0].path, function (err:any, data:any) {
             fs.writeFile(des_file, data, function (err:any) {
                 if( err ){
                     console.log( err );
                 }else{
                     let response = {
                         message:'File uploaded successfully',
                         filename:"/upload_tmp/"+req.files[0].originalname
                     };
                     console.log( response );
                     res.end( JSON.stringify( response ) );
                 }
             });
         });
     });

module.exports = router;   /*暴露这个 router模块*/