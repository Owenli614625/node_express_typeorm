var express = require('express');
import { createConnection } from "typeorm";
import { RecruitStudents } from "../entity/RecruitStudents";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";

const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();

//函授站申报计划表

createConnection(/*recruitStudents*/).then(async connection => {
    let Repository = connection.getRepository(RecruitStudents);


    /**
     * 添加函授站招生申报计划
     * @group 函授站招生申报接口
     * @route POST /recruitStudents/add
     * @summary 添加函授站招生申报计划
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int} school_id.formData                学校id
     * @param {string} grade.formData                 批次/年级
     * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
     * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
     * @param {string} subject.formData               科类
     * @param {int} major_id.formData                 专业id
     * @param {int} station_id.formData               函授站id
     * @param {int} apply_number.formData             本次申请人数
     * @param {int} last_apply_number.formData        上次申请人数
     * @param {int} apply_starttime.formData          申报状态 0-未开始,1-进行中，2-已结束
     * @param {int} apply_endtime.formData            申报结束时间
     * @param {int} before_apply_number.formData      预报名人数
     * @param {int} admission_count.formData          招生总数
     * @param {int} actual_admission_number.formData  已经录取人数
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:recruitStudents:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }
        //执行sql
        let row = new RecruitStudents();
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
     * 删除函授站招生申报计划
     * @group 函授站招生申报接口
     * @route DELETE /recruitStudents/delete
     * @summary 删除函授站招生申报计划
     * @param {string} Cookie.header                  用户登录cookie
     * @param {Array} ids.formData                    预报名学生ids
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.delete('/delete', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:recruitStudents:delete', req.cookies.JSESSIONID);
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
       * 修改函授站招生申报计划
       * @group 函授站招生申报接口
       * @route POST /recruitStudents/update
       * @summary 修改函授站招生申报计划
       * @param {string} Cookie.header                  用户登录cookie
       * @param {Array} id.formData                     招生计划id
       * @param {int} school_id.formData                学校id
       * @param {string} grade.formData                 批次/年级
       * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
       * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
       * @param {string} subject.formData               科类
       * @param {int} major_id.formData                 专业id
       * @param {int} station_id.formData               函授站id
       * @param {int} apply_number.formData             本次申请人数
       * @param {int} last_apply_number.formData        上次申请人数
       * @param {int} apply_starttime.formData          申报状态 0-未开始,1-进行中，2-已结束
       * @param {int} apply_endtime.formData            申报结束时间
       * @param {int} before_apply_number.formData      预报名人数
       * @param {int} admission_count.formData          招生总数
       * @param {int} actual_admission_number.formData  已经录取人数
       * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
       * @returns {error} default - {success: false,code: code,data: data,message: message}
       */

    router.post('/update', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:recruitStudents:update', req.cookies.JSESSIONID);
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
 * 根据条件查看函授站招生申报计划
 * @group 函授站招生申报接口
 * @route POST /recruitStudents/list
 * @summary 根据条件查看函授站招生申报计划
 * @param {string} Cookie.header                  用户登录cookie
 * @param {int} school_id.formData                学校id
 * @param {string} grade.formData                 批次/年级
 * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
 * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
 * @param {string} subject.formData               科类
 * @param {int} major_id.formData                 专业id
 * @param {int} station_id.formData               函授站id
 * @param {int} apply_starttime.formData          申报状态 0-未开始,1-进行中，2-已结束
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
router.post('/list', async (req: any, res: any) => {
    
    //权限
    try {
        let auth = await status.authority('sys:recruitStudents:list', req.cookies.JSESSIONID);
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
    }else{
        
        res.jsonp(status.error(500, "school_id is not null", "school_id"));
        res.end();
        return;
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


    if (!status.verify_parameters(req.body.station_id)) {
        where = where + " AND station_id= '" + req.body.station_id + "'";
    }

    if (!status.verify_parameters(req.body.apply_status)) {
        where = where + " AND apply_status= '" + req.body.apply_status + "'";
    }



    let sql_ret: any;
    try {
        let sql = "SELECT * FROM recruit_students WHERE " + where + " LIMIT " + rows + " OFFSET " + offset;
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