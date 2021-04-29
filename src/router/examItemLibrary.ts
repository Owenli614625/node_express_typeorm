var express = require('express');
import { createConnection } from "typeorm";
import { Exam_item_library } from "../entity/ExamItemLibrary";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var url = require("url");

//全局变量
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();



createConnection(/*ExamItemLibrary*/).then(async connection => {
    let ExamItemLibraryRepository = connection.getRepository(Exam_item_library);

    /**
     * 向题库中添加试题
     * @group 试题库
     * @route POST /examItemLibrary/add
     * @summary 向题库中添加试题
     * @param {int} category.formData                     题类型
     * @param {string} question.formData                  题目
     * @param {string} options.formData                   选项
     * @param {string} hint.formData                      提示信息
     * @param {string} analysis.formData                  答案解析
     * @param {string} answer.formData                    答案
     * @param {int} curriculum_id.formData                课程id
     * @param {int} school_id.formData                    所属学校ID
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:examItemLibrary:add', req.cookies.JSESSIONID);
            if(auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let question = new Exam_item_library();
        question = Object.assign({}, req.body);
        question.insert_time = new Date();
        let sql_ret: any;
        try {
            sql_ret = await ExamItemLibraryRepository.save(question);
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
     * 删除试题
     * @group 试题库
     * @route POST /examItemLibrary/delete
     * @summary 通过ids删除试题 
     * @param {Array} dis.formData                   题ids ;数组元素为试题id
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
    router.post('/delete', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:examItemLibrary:delete', req.cookies.JSESSIONID);
            if(auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }
        
        //执行sql
        let sql_ret: any;
        try {
            let ids: any = req.body.ids;
            for (let i: number = 0; i < ids.length; i++) {
                let examRemove = await ExamItemLibraryRepository.findOne(ids[i]);
                await ExamItemLibraryRepository.remove(examRemove);
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
     * 修改试题
     * @group 试题库
     * @route POST /examItemLibrary/update
     * @summary 通过id修改试题
     * @param {int} id.formData                           题id
     * @param {int} category.formData                     题类型
     * @param {string} question.formData                  题目
     * @param {string} options.formData                   选项
     * @param {string} hint.formData                      提示信息
     * @param {string} analysis.formData                  答案解析
     * @param {string} answer.formData                    答案
     * @param {timestamp} insert_time.formData            添加时间
     * @param {int} curriculum_id.formData                课程id
     * @param {int} school_id.formData                    所属学校ID
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
    router.post('/update', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:examItemLibrary:update', req.cookies.JSESSIONID);
            if(auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql

        let sql_ret: any;
        try {
            let exam = await ExamItemLibraryRepository.findOne(req.body.id);
            exam = Object.assign({}, req.body);
            await ExamItemLibraryRepository.save(exam);
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
 * 查看试题信息
 * @group 试题库
 * @route POST /examItemLibrary/list
 * @summary 查看试题信息
 * @param {int} category.formData                     题类型
 * @param {string} question.formData                  题目
 * @param {int} curriculum_id.formData                课程id
 * @param {int} school_id.formData                    所属学校ID
 * @param {int} page.int                              *页号 page>=1
 * @param {int} rows.int                              *行数 rows>=0
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
router.post('/list', async (req: any, res: any) => {

    //权限
    try {
        let auth = await status.authority('sys:examItemLibrary:list', req.cookies.JSESSIONID);
        if(auth.code != 200) { res.jsonp(auth); res.end(); return; }
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

    //通过题干模糊查找
    if (!status.verify_parameters(req.body.question)) {
        where = where + " AND question LIKE'%" + req.body.question + "%'";
    }

    //通过类型category查找
    if (!status.verify_parameters(req.body.category)) {
        where = where + " AND category= '" + req.body.category + "'";
    }

    //通过学校查找
    if (!status.verify_parameters(req.body.school_id)) {
        where = where + " AND school_id=" + req.body.school_id;
    }

    //通过课程id查找
    if (!status.verify_parameters(req.body.curriculum_id)) {
        where = where + " AND curriculum_id=" + req.body.curriculum_id;
    }

    let sql_ret: any;
    try {
        let sql = "SELECT * FROM exam_item_library WHERE " + where + " LIMIT " + rows + " OFFSET " + offset;
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