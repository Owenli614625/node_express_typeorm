var express = require('express');
import { createConnection } from "typeorm";
import { TestQuestion } from "../entity/TestQuestion";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var path = require("path");
var xlsx = require("node-xlsx");
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();


createConnection(/*testQuestion*/).then(async connection => {

    let Repository = connection.getRepository(TestQuestion);

   /**
     * 给试卷添加试题
     * @group 试卷添加试题接口
     * @route POST /testQuestion/add
     * @summary 给试卷添加试题
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} test_paper_id.formData                试卷id
     * @param {string} question_id.formData               题id
     * @param {int} order_number.formData                 序号
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:testQuestion:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        let row = new TestQuestion();
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
     * 删除试卷中试题
     * @group 试卷添加试题接口
     * @route DELETE /testQuestion/delete
     * @summary 删除试卷中试题
     * @param {string} Cookie.header                  用户登录cookie
     * @param {array} ids                            试卷中试题ids eg：[1,2,3,4]
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
 router.delete(' /delete', async (req: any, res: any) => {
    //权限
    try {
        let auth = await status.authority('sys:testQuestion:delete', req.cookies.JSESSIONID);
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
     * 修改试卷添加试题
     * @group 试卷添加试题接口
     * @route POST /testQuestion/update
     * @summary 修改试卷添加试题
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} id                                    试卷中试题id
     * @param {int} test_paper_id.formData                试卷id
     * @param {string} question_id.formData               题id
     * @param {int} order_number.formData                 序号
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

 router.post('/update', async (req: any, res: any) => {

    //权限
    try {
        let auth = await status.authority('sys:testQuestion:update', req.cookies.JSESSIONID);
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
     * 查看试卷中的试题
     * @group 试卷添加试题接口
     * @route POST /testQuestion/add
     * @summary 查看试卷中的试题
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} test_paper_id.formData                试卷id
     * @param {int} category.formData                     题类型id 通过字典获得id
     * @param {int} order_number.formData                 序号
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
  router.post('/list', async (req: any, res: any) => {
    //权限
    try {
        let auth = await status.authority('sys:testQuestion:list', req.cookies.JSESSIONID);
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

    let where = " WHERE test_question.`question_id`=exam_item_library.`id` ";

    if (!status.verify_parameters(req.body.test_paper_id)) {
        where = where + " AND test_question.`test_paper_id`= " + req.body.test_paper_id;
    }
    if (!status.verify_parameters(req.body.order_number)) {
        where = where + " AND test_question.`order_number`= " + req.body.order_number;
    }

    if (!status.verify_parameters(req.body.category)) {
        where = where + "AND exam_item_library.`category`= " + req.body.category;
    }


    let sql_ret: any;
    try {
        let sql = "SELECT * FROM test_question WHERE " + where + " LIMIT " + rows + " OFFSET " + offset;
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