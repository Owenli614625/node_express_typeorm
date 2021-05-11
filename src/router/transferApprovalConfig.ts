var express = require('express');
import { createConnection } from "typeorm";
import { TransferApprovalConfig } from "../entity/TransferApprovalConfig";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var path = require("path");
var xlsx = require("node-xlsx");
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();



createConnection(/*transferApprovalConfig*/).then(async connection => {
    let Repository = connection.getRepository(TransferApprovalConfig);

    /**
     * 添加转站审批流程
     * @group 转站审批流程配置接口
     * @route POST /transferApprovalConfig/add
     * @summary 添加转站审批流程
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int} school_id.formData                学校id
     * @param {string} Approval_process.formData      审批流配置：3|1|2 审批流配置：3|1|2 {1:原函授站;2:新函授站;3:学校}
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:transferApprovalConfig:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }
        //执行sql
        let sql_ret: any;
        let row = new TransferApprovalConfig();
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
     * 添加转站审批流程
     * @group 转站审批流程配置接口
     * @route delete /transferApprovalConfig/delete
     * @summary 添加转站审批流程
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int}    ids.formData                    审批流程id
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
     router.delete('/delete', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:transferApprovalConfig:delete', req.cookies.JSESSIONID);
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
     * 添加转站审批流程
     * @group 转站审批流程配置接口
     * @route POST /transferApprovalConfig/update
     * @summary 添加转站审批流程
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int}    ids.formData                   审批流程id
     * @param {string} Approval_process.formData      审批流配置：3|1|2 审批流配置：3|1|2 {1:原函授站;2:新函授站;3:学校}
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.delete('/update', async (req: any, res: any) => {
        //权限
        //权限
        try {
            let auth = await status.authority('sys:transferApprovalConfig:update', req.cookies.JSESSIONID);
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
     * 查看转站审批流程
     * @group 转站审批流程配置接口
     * @route POST /transferApprovalConfig/get
     * @summary 查看转站审批流程
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int}    school_id.formData             学校id
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

 router.post('/get', async (req: any, res: any) => {
    
    //权限
    try {
        let auth = await status.authority('sys:transferApprovalConfig:get', req.cookies.JSESSIONID);
        if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
    } catch (error) {
        console.log(error);
    }

    //执行sql
    let sql_ret: any;
    try {
        let sql = "SELECT * FROM transfer_approval_config WHERE school_id="+req.body.school_id;
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