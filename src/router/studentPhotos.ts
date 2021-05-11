var express = require('express');
import { createConnection } from "typeorm";
import { StudentPhotos } from "../entity/StudentPhotos";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var path = require("path");
var xlsx = require("node-xlsx");
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();


createConnection(/*studentPhotos*/).then(async connection => {
    let Repository = connection.getRepository(StudentPhotos);

    /**
     * 学生照片添加
     * @group 学生照片采集接口
     * @route POST /studentPhotos/add
     * @summary 学生照片添加
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int} student_id.formData               学生id
     * @param {string} entrance_photo.formData        入学照片
     * @param {string} card_photo.formData            证件照片
     * @param {string} graduation_photo.formData      毕业照片
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {
        //权限

        //执行sql
        let sql_ret: any;
        let row = new StudentPhotos();
        row = Object.assign({}, req.body);
        try {
            sql_ret = await Repository.save(row);
        } catch (error) {
            sql_ret = error;
            res.jsonp(status.error(error.errno, error.sqlMessage, error.code));
            res.end();
            return;
        }
        res.jsonp(status.success(200, sql_ret));
        res.end();
    });

    /**
     * 删除学生照片
     * @group 学生照片采集接口
     * @route DELETE /studentPhotos/delete
     * @summary 删除学生照片
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int} student_id.formData               学生id
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.delete('/delete', async (req: any, res: any) => {
        //权限

        //执行sql
        let sql_ret: any;
        try {
            let sql = "DELETE FROM student_photos WHERE student_id=" + req.body.student_id;
            sql_ret = await sqldb.execute(sql, []);
        } catch (error) {
            sql_ret = error;
            res.jsonp(status.error(error.errno, error.sqlMessage, error.code));
            res.end();
            return;
        }
        res.jsonp(status.success(200, sql_ret));
        res.end();

    });

    /**
        * 修改学生照片
        * @group 学生照片采集接口
        * @route POST /studentPhotos/update
        * @summary 修改学生照片
        * @param {string} Cookie.header                       用户登录cookie
        * @param {int}    id.formData                         id(注意不是学生id)
        * @param {string} entrance_photo.formData             入学照片
        * @param {string} card_photo.formData                 证件照片
        * @param {string} graduation_photo.formData           毕业照片
        * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
        * @returns {error} default - {success: false,code: code,data: data,message: message}
        */

    router.post('/update', async (req: any, res: any) => {
        //权限

        //执行sql
       //执行sql
       let sql_ret: any;
       try {
            let obj = await Repository.findOne(req.body.id); //如果不是id他会新新增加一条数据
           obj= Object.assign({}, req.body);
           await Repository.save(obj);
       } catch (error) {
           sql_ret = error;
           res.jsonp(status.error(error.errno, error.sqlMessage, error.code));
           res.end();
           return;
       }
       res.jsonp(status.success(200, sql_ret));
       res.end();

    });


    /**
     * 通过学生id获得照片
     * @group 学生照片采集接口
     * @route POST /studentPhotos/getPhotos
     * @summary 通过学生id获得照片
     * @param {string} student_id.string  学生id
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
    router.post('/getPhotos', async (req: any, res: any) => {
        let sql_ret: any;
        try {
            let sql = "SELECT * FROM student_photos WHERE student_id=" + req.body.student_id;
            sql_ret = await sqldb.query(sql, []);
        } catch (error) {
            sql_ret = error;
            res.jsonp(status.error(error.errno, error.sqlMessage, error.code));
            res.end();
            return;
        }
        res.jsonp(status.success(200, sql_ret));
        res.end();
    });

});



module.exports = router;   /*暴露这个 router模块*/