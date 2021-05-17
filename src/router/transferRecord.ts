var express = require('express');
import { createConnection } from "typeorm";
import { TransferRecord } from "../entity/TransferRecord";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var path = require("path");
var xlsx = require("node-xlsx");
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();



createConnection(/*transferRecord*/).then(async connection => {
    let Repository = connection.getRepository(TransferRecord);

    /**
     * 新增转站申请记录
     * @group 转站申请记录接口
     * @route POST /transferRecord/add
     * @summary 新增转站申请记录
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int} student_id.formData               学生id
     * @param {string} student_card.formData          学生身份证号
     * @param {string} student_reason.formData        转站原因
     * @param {int} original_station_id.formData      原函授站id
     * @param {int} new_station_opinion.formData      新函授站id
     * @param {string} application_url.formData       转站申请书url
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {
        //权限

        //执行sql
        let sql_ret: any;
        let row = new TransferRecord();
        row = Object.assign({}, req.body);
        row.application_time=new Date(); //记录转站申请时间
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
     * 删除转站申请记录
     * @group 转站申请记录接口
     * @route delete /transferRecord/delete
     * @summary 删除转站申请记录
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int}    ids.formData                   审批流程ids
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
    router.delete('/delete', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:transferRecord:delete', req.cookies.JSESSIONID);
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
     * 修改转站申请记录
     * @group 转站申请记录接口
     * @route POST /transferRecord/update
     * @summary 修改转站申请记录
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int} id.formData                       转站记录id
     * @param {int} student_id.formData               学生id
     * @param {string} student_card.formData          学生身份证号
     * @param {string} student_reason.formData        转站原因
     * @param {int} original_station_id.formData      原函授站id
     * @param {int} new_station_opinion.formData      新函授站id
     * @param {string} application_url.formData       转站申请书url
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.delete('/update', async (req: any, res: any) => {
        //权限

        try {
            let auth = await status.authority('sys:transferRecord:update', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        try {
            let exam = await Repository.findOne(req.body.id);
            exam = Object.assign({}, req.body);
            exam.application_time=new Date(); //转站记录申请修改时间
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
 * 查看转站申请记录
 * @group 转站申请记录接口
 * @route POST /transferRecord/get
 * @summary 查看转站申请记录
 * @param {string} Cookie.header                  用户登录cookie
 * @param {int}    student_id.formData            学生id
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */

router.post('/get', async (req: any, res: any) => {

    //权限
    try {
        let auth = await status.authority('sys:transferRecord:get', req.cookies.JSESSIONID);
        if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
    } catch (error) {
        console.log(error);
    }

    //执行sql
    let sql_ret: any;
    try {
        let sql = "SELECT * FROM transfer_record WHERE student_id=" + req.body.student_id;
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