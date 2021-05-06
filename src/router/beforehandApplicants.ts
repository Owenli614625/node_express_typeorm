
var express = require('express');
import { createConnection } from "typeorm";
import { BeforehandApplicants } from "../entity/BeforehandApplicants";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";

const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();



createConnection(/*beforehandApplicants*/).then(async connection => {
    let Repository = connection.getRepository(BeforehandApplicants);

    /**
     * 预报名信息录入
     * @group 预报名接口
     * @route POST /beforehandApplicants/add
     * @summary 预报名信息录入
     * @param {string} Cookie.header                  用户登录cookie
     * @param {string} student_name.formData          学生姓名
     * @param {int} student_card.formData             学生身份证号
     * @param {int} gender.formData                   性别,0-男，1-女
     * @param {int} phone.formData                    手机号
     * @param {int} enrollment_batch_id.formData      预报名招生批次id
     * @param {timestamp} school_id.formData          学校id
     * @param {timestamp} major_id.formData           专业id
     * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
     * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:beforehandApplicants:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }
        //执行sql
        let row = new BeforehandApplicants();
        row = Object.assign({}, req.body);
        let sql_ret;
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
     * 删除预报名信息
     * @group 预报名接口
     * @route DELETE /beforehandApplicants/delete
     * @summary 删除预报名信息
     * @param {string} Cookie.header                  用户登录cookie
     * @param {Array} ids.formData                    预报名学生ids
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.delete('/delete', async (req: any, res: any) => {
          //权限
          try {
            let auth = await status.authority('sys:beforehandApplicants:delete', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        try {
            let ids: any = req.body.ids;
            for (let i: number = 0; i < ids.length; i++) {

                let examRemove = await Repository.findOne(ids[i]);
                await Repository.remove(examRemove);

            }

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
     * 修改预报名信息
     * @group 预报名接口
     * @route POST /beforehandApplicants/update
     * @summary 修改预报名信息
     * @param {string} Cookie.header                  用户登录cookie
     * @param {Array} id.formData                     预报名学生id
     * @param {string} student_name.formData          学生姓名
     * @param {int} student_card.formData             学生身份证号
     * @param {int} gender.formData                   性别,0-男，1-女
     * @param {int} phone.formData                    手机号
     * @param {int} enrollment_batch_id.formData      预报名招生批次id
     * @param {timestamp} school_id.formData          学校id
     * @param {timestamp} major_id.formData           专业id
     * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
     * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.post('/update', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:beforehandApplicants:update', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        try {
            let exam = await Repository.findOne(req.body.id);
            exam = Object.assign({}, req.body);
            await Repository.save(exam);
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


/**
     * 根据条件查看预报名信息
     * @group 预报名接口
     * @route POST /beforehandApplicants/list
     * @summary 根据条件查看预报名信息
     * @param {string} Cookie.header                  用户登录cookie
     * @param {Array} id.formData                     预报名学生id
     * @param {string} student_name.formData          学生姓名
     * @param {int} student_card.formData             学生身份证号
     * @param {int} gender.formData                   性别,0-男，1-女
     * @param {int} phone.formData                    手机号
     * @param {int} enrollment_batch_id.formData      预报名招生批次id
     * @param {timestamp} school_id.formData          学校id
     * @param {timestamp} major_id.formData           专业id
     * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
     * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
     * @param {int} page.formData                //页号 page>=1
     * @param {int} rows.formData                //行数 rows>=0
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
router.post('/list', async (req: any, res: any) => {
     //权限
     try {
        let auth = await status.authority('sys:beforehandApplicants:list', req.cookies.JSESSIONID);
        if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
    } catch (error) {
        console.log(error);
    }

    //执行sql


    let page: number;
    var rows: number;
    if (isNaN(req.body.page)) {
        page = 1;
    } else {
        page = +req.body.page;
    }
    if (isNaN(req.body.rows)) {
        rows = 10;
    } else {
        rows = +req.body.rows;
    }
    let offset = rows * (page - 1);

    let where = " 1=1 ";
    res.jsonp(status.success(200, where));
    res.end();
});
module.exports = router;   /*暴露这个 router模块*/