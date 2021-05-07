var express = require('express');
import { createConnection } from "typeorm";
import { SchoolEnrollmentPlan } from "../entity/SchoolEnrollmentPlan";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";

const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();

//学校招生计划表

createConnection(/*schoolEnrollmentPlan*/).then(async connection => {
    let Repository = connection.getRepository(SchoolEnrollmentPlan);


    /**
     * 添加学校招生计划
     * @group 学校招生计划接口
     * @route POST /schoolEnrollmentPlan/add
     * @summary 添加学校招生计划
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int} school_id.formData                学校id
     * @param {string} grade.formData                 批次/年级
     * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
     * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
     * @param {string} subject.formData               科类
     * @param {int} major_id.formData                 专业id
     * @param {int} apply_number.formData             本次申请人数
     * @param {int} last_apply_number.formData        上次申请人数
     * @param {int} apply_starttime.formData          申报状态 0-未开始,1-进行中，2-已结束
     * @param {int} apply_endtime.formData            申报结束时间
     * @param {int} admission_count.formData          计划招生人数
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:schoolEnrollmentPlan:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }
        //执行sql
        let row = new SchoolEnrollmentPlan();
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
     * 删除学校招生计划
     * @group 学校招生计划接口
     * @route DELETE /schoolEnrollmentPlan/delete
     * @summary 删除学校招生计划
     * @param {string} Cookie.header                  用户登录cookie
     * @param {Array} ids.formData                    预报名学生ids
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.delete('/delete', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:schoolEnrollmentPlan:delete', req.cookies.JSESSIONID);
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
       * 修改学校招生计划
       * @group 学校招生计划接口
       * @route POST /schoolEnrollmentPlan/update
       * @summary 修改学校招生计划
       * @param {string} Cookie.header                  用户登录cookie
       * @param {Array} id.formData                     招生计划id
       * @param {int} school_id.formData                学校id
       * @param {string} grade.formData                 批次/年级
       * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
       * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
       * @param {string} subject.formData               科类
       * @param {int} major_id.formData                 专业id
       * @param {int} apply_number.formData             本次申请人数
       * @param {int} last_apply_number.formData        上次申请人数
       * @param {int} apply_starttime.formData          申报状态 0-未开始,1-进行中，2-已结束
       * @param {int} apply_endtime.formData            申报结束时间
       * @param {int} admission_count.formData          计划招生人数

       * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
       * @returns {error} default - {success: false,code: code,data: data,message: message}
       */

    router.post('/update', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:schoolEnrollmentPlan:update', req.cookies.JSESSIONID);
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
 * 根据条件学校招生计划
 * @group 学校招生计划接口
 * @route POST /schoolEnrollmentPlan/list
 * @summary 根据条件学校招生计划
 * @param {string} Cookie.header                  用户登录cookie
 * @param {int} school_id.formData                学校id
 * @param {string} grade.formData                 批次/年级
 * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
 * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
 * @param {string} subject.formData               科类
 * @param {int} major_id.formData                 专业id
 * @param {int} apply_starttime.formData          申报状态 0-未开始,1-进行中，2-已结束
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
router.post('/list', async (req: any, res: any) => {
    
    //权限
    try {
        let auth = await status.authority('sys:schoolEnrollmentPlan:list', req.cookies.JSESSIONID);
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


    if (!status.verify_parameters(req.body.school_id)) {
        where = where + " AND school_id= '" + req.body.school_id + "'";
    }


    if (!status.verify_parameters(req.body.grade)) {
        where = where + " AND grade= '" + req.body.grade + "'";
    }

    if (!status.verify_parameters(req.body.learn_way)) {
        where = where + " AND learn_way= '" + req.body.learn_way + "'";
    }

    if (!status.verify_parameters(req.body.education_level)) {
        where = where + " AND education_level= '" + req.body.education_level + "'";
    }


    if (!status.verify_parameters(req.body.subject)) {
        where = where + " AND subject= '" + req.body.subject + "'";
    }

    if (!status.verify_parameters(req.body.major_id)) {
        where = where + " AND major_id= '" + req.body.major_id + "'";
    } 

    if (!status.verify_parameters(req.body.apply_status)) {
        where = where + " AND apply_status= '" + req.body.apply_status + "'";
    }



    let sql_ret: any;
    try {
        let sql = "SELECT * FROM school_enrollment_plan WHERE " + where + " LIMIT " + rows + " OFFSET " + offset;
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



module.exports = router;   /*暴露这个 router模块*/