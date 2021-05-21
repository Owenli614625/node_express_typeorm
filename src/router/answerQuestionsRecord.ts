var express = require('express');
import { createConnection } from "typeorm";
import { AnswerQuestionsRecord } from "../entity/AnswerQuestionsRecord";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var path = require("path");
var xlsx = require("node-xlsx");
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();
createConnection(/*testQuestion*/).then(async connection => {

    let Repository = connection.getRepository(AnswerQuestionsRecord);

    /**
     * 添加学生试题作答结果
     * @group 记录学生试题作答结果接口
     * @route POST /answerQuestionsRecord/add
     * @summary 添加学生试题作答结果
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} 学生id.formData                       学生id
     * @param {int} test_paper_id.formData                试卷id
     * @param {int} question_id.formData                  题id
     * @param {int} answer_type.formData                  作答结果类型 0:url，1:作答结果字符串
     * @param {string} student_answer.formData            学生作答结果
     * @param {get_core} student_answer.formData          得分
     * @param {marking_status} student_answer.formData    批阅状态 0-没有批阅,1-已经批阅
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
     router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:answerQuestionsRecord:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        let row = new AnswerQuestionsRecord();
        row = Object.assign({}, req.body);
        row.marking_time = new Date();
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
     * 删除学生试题作答结果
     * @group 记录学生试题作答结果接口
     * @route DELETE /answerQuestionsRecord/delete
     * @summary 删除学生试题作答结果
     * @param {string} Cookie.header                  用户登录cookie
     * @param {array} ids                             作答记录ids eg：[1,2,3,4]
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
 router.delete(' /delete', async (req: any, res: any) => {
    //权限
    try {
        let auth = await status.authority('sys:answerQuestionsRecord:delete', req.cookies.JSESSIONID);
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
     * 修改学生试题作答结果
     * @group 记录学生试题作答结果接口
     * @route POST /answerQuestionsRecord/update
     * @summary 修改学生试题作答结果
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} id                                    作答记录id 
     * @param {int} student_id.formData                   学生id
     * @param {int} test_paper_id.formData                试卷id
     * @param {int} question_id.formData                  题id
     * @param {int} answer_type.formData                  作答结果类型 0:url，1:作答结果字符串
     * @param {string} student_answer.formData            学生作答结果
     * @param {get_core} student_answer.formData          得分
     * @param {marking_status} student_answer.formData    批阅状态 0-没有批阅,1-已经批阅
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
  router.post('/update', async (req: any, res: any) => {
    //权限
    try {
        let auth = await status.authority('sys:answerQuestionsRecord:update', req.cookies.JSESSIONID);
        if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
    } catch (error) {
        console.log(error);
    }

    //执行sql
    let sql_ret: any;
    let row = new AnswerQuestionsRecord();
    row = Object.assign({}, req.body);
    row.marking_time = new Date();
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

});


/**
     * 查看学生试题作答结果
     * @group 记录学生试题作答结果接口
     * @route POST /answerQuestionsRecord/list
     * @summary 查看学生试题作答结果
     * @param {string} Cookie.header                      用户登录cookie
     * @param {int} id                                    作答记录id 
     * @param {int} student_id.formData                   学生id
     * @param {int} test_paper_id.formData                试卷id
     * @param {int} question_id.formData                  题id
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
 router.post('/list', async (req: any, res: any) => {
    //权限
    try {
        let auth = await status.authority('sys:answerQuestionsRecord:list', req.cookies.JSESSIONID);
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

    if (!status.verify_parameters(req.body.id)) {
        where = where + " AND id= '" + req.body.id + "'";
    }

    if (!status.verify_parameters(req.body.student_id)) {
        where = where + " AND student_id= '" + req.body.student_id + "'";
    }

    if (!status.verify_parameters(req.body.test_paper_id)) {
        where = where + " AND test_paper_id= '" + req.body.test_paper_id + "'";
    }

    if (!status.verify_parameters(req.body.question_id)) {
        where = where + " AND question_id= '" + req.body.question_id + "'";
    }

  

    let sql_ret: any;
    try {
        let sql = "SELECT * FROM answer_questions_record WHERE " + where + " LIMIT " + rows + " OFFSET " + offset;
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