var express = require('express');
import { createConnection } from "typeorm";
import { Sys_permission } from "../entity/Sys_permission";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var multiparty = require('multiparty');
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();

createConnection(/*sys_permission*/).then(async connection => {

    let Repository = connection.getRepository(Sys_permission);

    /**
     * 新增权限
     * @group 权限模块接口
     * @route POST /sys_permission/add
     * @summary 新增权限 
     * @param {string} Cookie.header             用户登录cookie
     * @param {string} perm_name.formData        权限名称
     * @param {string} perm_code.formData        权限标识
     * @param {string} perm_desc.formData           权限描述
     * @param {bit} del_flag.formData            权限删除标识，1-正常，0-删除
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:sys_permission:list', req.cookies.JSESSIONID);
            if (auth.code == 500) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let obj = new Sys_permission();
        obj = Object.assign({}, req.body);
        obj.create_time = new Date();
        let sql_ret;
        try {
            sql_ret = await Repository.save(obj);
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
     * 删除权限
     * @group 权限模块接口
     * @route delete /sys_permission/delete
     * @summary 删除权限 
     * @param {string} Cookie.header             用户登录cookie
     * @param {array} ids.formData              权限ids
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
    router.delete('/delete', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:sys_permission:list', req.cookies.JSESSIONID);
            if (auth.code == 500) { res.jsonp(auth); res.end(); return; }
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
     * 查看所有权限
     * @group 权限模块接口
     * @route POST /sys_permission/all
     * @summary 查看所有权限
     * @param {string} Cookie.header             用户登录cookie
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
    router.get('/all', async (req: any, res: any) => {

        //权限
        // try {
        //     let auth = await status.authority('sys:sys_permission:list', req.cookies.JSESSIONID);
        //     if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        // } catch (error) {
        //     console.log(error);
        // }

        //执行sql
        let sql_re: any;
        sql_re = await Repository.findAndCount();
        res.jsonp(status.success(200, sql_re));
        res.end();
    });


}).catch(error => console.log(error));


/**
 * 通过权限名称查找权限
 * @group 权限模块接口
 * @route POST /sys_permission/list
 * @summary 通过权限名称查找权限
 * @param {string} Cookie.header             用户登录cookie
 * @param {string} perm_name.formData          权限名称
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
router.post('/list', async (req: any, res: any) => {

    console.log(req.body);
    console.log(req.body.perm_name);
    console.log( req.cookies.JSESSIONID);
    //权限
    try {
        let auth = await status.authority('sys:sys_permission:list', req.cookies.JSESSIONID);
        console.log(auth);
        if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
    } catch (error) {
        console.log(error);
    }

    //执行sql
    //通过题干模糊查找
    let where = " 1=1 ";
    if (!status.verify_parameters(req.body.perm_name)) {
        where = where + " AND perm_name LIKE'%" + req.body.perm_name + "%'";
    }

    let sql_ret: any;
    try {
        let sql = "SELECT * FROM sys_permission WHERE " + where ;
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