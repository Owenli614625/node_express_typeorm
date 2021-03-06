
var express = require('express');
import { createConnection } from "typeorm";
import { Examination } from "../entity/Examination";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";

const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();



createConnection(/*exam*/).then(async connection => {
    let examRepository = connection.getRepository(Examination);

    /**
     * 新增考试
     * @group 考试模块接口
     * @route POST /exam/add
     * @summary 向系统提交一次考试并记录到考试信息表(examination)中
     * @param {string} Cookie.header            用户登录cookie
     * @param {string} subject.formData         考试科目
     * @param {string} majors.formData           所属专业
     * @param {int} school_id.formData           所属学校ID
     * @param {int} gradeid.formData                 批次/年级id
     * @param {int} stations.formData            所属函授站
     * @param {int} state.formData               考试状态，2-已完成，1-进行中，0-未开始
     * @param {int} consuming_time.formData      考试时长，单位分钟
     * @param {timestamp} start_time.formData    开始时间
     * @param {timestamp} end_time.formData      结束时间
     * @param {int} should_take_number.formData  应该参加考试人数 
     * @param {int} fact_take_number.formData    实际参加考试人数
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:exam:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }
        //执行sql
        let exam = new Examination();
        exam = Object.assign({}, req.body);
        let sql_ret;
        try {
            sql_ret = await examRepository.save(exam);
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
      * 删除考试信息
      * @group 考试模块接口
      * @route DELETE /exam/delete
      * @summary 删除考试信息(examination)中的n条数据(n>=1)
      * @param {string} Cookie.header            用户登录cookie
      * @param {Array} ids.formData                  考试ids
      * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
      * @returns {error} default - {success: false,code: code,data: data,message: message}
      */

    router.delete('/delete', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:exam:delete', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        try {
            let ids: any = req.body.ids;
            for (let i: number = 0; i < ids.length; i++) {

                let examRemove = await examRepository.findOne(ids[i]);
                await examRepository.remove(examRemove);

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
     * 修改考试信息
     * @group 考试模块接口
     * @route POST /exam/update
     * @summary 修改考试信息表(examination)中的单条数据，传入需要修改的列和值
     * @param {string} Cookie.header            用户登录cookie
     * @param {int} id.formData                  考试id
     * @param {string} subject.formData          考试科目
     * @param {string} majors.formData           所属专业
     * @param {int} school_id.formData           所属学校ID
     * @param {int} gradeid.formData                 批次/年级id
     * @param {int} stations.formData            所属函授站
     * @param {int} state.formData               考试状态，2-已完成，1-进行中，0-未开始
     * @param {int} consuming_time.formData      考试时长，单位分钟
     * @param {timestamp} start_time.formData    开始时间
     * @param {timestamp} end_time.formData      结束时间
     * @param {int} should_take_number.formData  应该参加考试人数 
     * @param {int} fact_take_number.formData    实际参加考试人数
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/update', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:exam:update', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        try {
            let exam = await examRepository.findOne(req.body.id);
            exam = Object.assign({}, req.body);
            await examRepository.save(exam);
        } catch (error) {
            sql_ret = error;
            res.jsonp(status.error(error.errno, error.sqlMessage, error.code));
            res.end();
            return;
        }
        res.jsonp(status.success(200, sql_ret));
        res.end();
    });






}).catch(error => console.log(error));




/**
 * 查看考试信息
 * @group 考试模块接口
 * @route POST /exam/list
 * @summary 查看考试信息表(examination)中数据
 * @param {string} Cookie.header            用户登录cookie
 * @param {string} subject.formData          考试科目
 * @param {string} majors.formData           所属专业
 * @param {int} school_id.formData           所属学校ID
 * @param {int} gradeid.formData                 批次/年级id
 * @param {int} stations.formData            所属函授站
 * @param {int} state.formData               考试状态，2-已完成，1-进行中，0-未开始
 * @param {int} page.formData                //页号 page>=1
 * @param {int} rows.formData                //行数 rows>=0
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */

router.post('/list', async (req: any, res: any) => {


    //权限
    try {
        let auth = await status.authority('sys:exam:list', req.cookies.JSESSIONID);
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

    if (!status.verify_parameters(req.body.subject)) {
        where = where + " AND subject LIKE'%" + req.body.subject + "%'";
    }

    if (!status.verify_parameters(req.body.majors)) {
        where = where + " AND majors= '" + req.body.majors + "'";
    }

    if (!status.verify_parameters(req.body.school_id)) {
        where = where + " AND school_id= '" + req.body.school_id + "'";
    }else{
        
        res.jsonp(status.error(500, "school_id is not null", "school_id"));
        res.end();
        return;
    }

    if (!status.verify_parameters(req.body.gradeid)) {
        where = where + " AND gradeid=" + req.body.gradeid;
    }

    if (!status.verify_parameters(req.body.stations)) {
        where = where + " AND stations='" + req.body.stations + "'";
    }

    if (!status.verify_parameters(req.body.state)) {
        where = where + " AND state=" + req.body.state;
    }

    let sql_ret: any;
    try {
        let sql = "SELECT * FROM examination WHERE " + where + " LIMIT " + rows + " OFFSET " + offset;
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






