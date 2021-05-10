
var express = require('express');
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";

const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();

/**
 * 审批函授站招生计划申请
 * @group 审批接口
 * @route POST /approval/recruitStudents/update
 * @summary 审批函授站招生计划申请
 * @param {string} Cookie.header                  用户登录cookie
 * @param {string} id.formData                    函授站申请招生计划id 
 * @param {string} approval_status.formData       审批状态 0-未审批,1-已同意，2-不同意
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
router.post('/recruitStudents/update', async (req: any, res: any) => {

    //权限
    try {
        let auth = await status.authority('sys:approval:recruitStudents:list', req.cookies.JSESSIONID);
        if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
    } catch (error) {
        console.log(error);
    }

    //执行sql
    let sql_ret: any;
    try {
        let sql = "UPDATE recruit_students SET approval_status=? WHERE id=?";
        sql_ret = await sqldb.execute(sql, [req.body.approval_status, req.body.id]);
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