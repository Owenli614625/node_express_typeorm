var express = require('express');
import { createConnection } from "typeorm";
import { TestPaper } from "../entity/TestPaper";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var path = require("path");
var xlsx = require("node-xlsx");
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();

createConnection(/*TestPaper*/).then(async connection => {
    let Repository = connection.getRepository(TestPaper);
    /**
     * 添加试卷
     * @group 试卷管理接口
     * @route POST /testPaper/add
     * @summary 添加试卷
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} school_id.formData                    学校id
     * @param {string} test_paper_name.formData           试卷名称
     * @param {int} major_id.formData                     专业id 
     * @param {int} subject_id.formData                   科目id
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
     router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:testPaper:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        let row = new TestPaper();
        row = Object.assign({}, req.body);
        row.insert_time = new Date();
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
     * 删除试卷信息
     * @group 试卷管理接口
     * @route DELETE /testPaper/delete
     * @summary 删除试卷信息
     * @param {string} Cookie.header                  用户登录cookie
     * @param {array} ids                             试卷ids eg：[1,2,3,4]
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
 router.delete(' /delete', async (req: any, res: any) => {
    //权限
    try {
        let auth = await status.authority('sys:testPaper:delete', req.cookies.JSESSIONID);
        if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
    } catch (error) {
        console.log(error);
    }


    //执行sql
    let sql_ret: any;
    try {
        let ids: any = req.body.ids;
        for (let i: number = 0; i < ids.length; i++) {

            let obj = await Repository.findOne(ids[i]);
            await Repository.remove(obj);

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
     * 修改试卷
     * @group 试卷管理接口
     * @route POST /testPaper/update
     * @summary 修改试卷
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} id                                    试卷id
     * @param {int} school_id.formData                    学校id
     * @param {string} test_paper_name.formData           试卷名称
     * @param {int} major_id.formData                        专业id 
     * @param {int} subject_id.formData                      科目id
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.post('/update', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:testPaper:update', req.cookies.JSESSIONID);
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
     * 查看试卷
     * @group 试卷管理接口
     * @route POST /testPaper/list
     * @summary 查看试卷
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} id                                    试卷id
     * @param {int} school_id.formData                    学校id
     * @param {string} test_paper_name.formData           试卷名称
     * @param {int} major_id.formData                        专业id 
     * @param {int} subject_id.formData                      科目id
     * @param {int} page.formData                         //页号 page>=1
     * @param {int} rows.formData                         //行数 rows>=0
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
 router.post('/list', async (req: any, res: any) => {
    //权限
    try {
        let auth = await status.authority('sys:testPaper:list', req.cookies.JSESSIONID);
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

    if (!status.verify_parameters(req.body.test_paper_name)) {
        where = where + " AND test_paper_name LIKE '%" + req.body.test_paper_name + "%'";
    }

    if (!status.verify_parameters(req.body.major_id)) {
        where = where + " AND major_id= '" + req.body.major_id + "'";
    }

    if (!status.verify_parameters(req.body.subject_id)) {
        where = where + " AND subject_id= '" + req.body.subject_id + "'";
    }

  

    let sql_ret: any;
    try {
        let sql = "SELECT * FROM test_paper WHERE " + where + " LIMIT " + rows + " OFFSET " + offset;
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