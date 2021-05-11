
var express = require('express');
import { createConnection } from "typeorm";
import { AdmissionList } from "../entity/AdmissionList";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var path = require("path");
var xlsx = require("node-xlsx");
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();



createConnection(/*admissionList*/).then(async connection => {
    let Repository = connection.getRepository(AdmissionList);

    /**
     * 添加录取学生信息（逐条添加）
     * @group 录取名单管理接口
     * @route POST /admissionList/add
     * @summary 添加录取学生信息
     * @param {string} Cookie.header                  用户登录cookie
     * @param {string} student_name.formData          学生姓名
     * @param {int} student_card.formData             学生身份证号
     * @param {int} gender.formData                   性别,0-男，1-女
     * @param {int} phone.formData                    手机号
     * @param {int} gradeid.formData                 批次/年级id
     * @param {timestamp} school_id.formData          学校id
     * @param {timestamp} major_id.formData           专业id
     * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
     * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:admissionList:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        let row = new AdmissionList();
        row = Object.assign({}, req.body);
        row.enroll_time = new Date();
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
     * 导入录取学生信息（批量导入）
     * @group 录取名单管理接口
     * @route POST /admissionList/adds
     * @summary 导入录取学生信息（批量导入）
     * @param {string} Cookie.header                  用户登录cookie
     * @param {int} schoolid.formData                 学校id
     * @param {string} grade.formData                 批次/年级
     * @param {file} filePath.formData               录取人名单文件路径
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
    router.post('/adds', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:admissionList:adds', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }


        let filepath = path.join(__dirname + "/.." + req.body.filePath);
        console.log(filepath);
        //let jidu=20;
        // for(let i:number=0;i<=5;i++)
        // {
        //     //  res.write(i*jidu+"% ");
        //     setInterval(myfunction,1000);
        //     res.write(i*jidu+"% ")
        // }

        // res.end();
        return;

        var obj = xlsx.parse(filepath);

        let excelObj = obj[0].data;
        //行列遍历
        let sql_ret: any;
        //导入成功个数，失败个数，导入总个数
        for (let i = 1; i < excelObj.length; i++) {
            let username = excelObj[i][0];
            let idcard = excelObj[i][1];
            let phoneNumber = excelObj[i][2];
            let department = excelObj[i][3];
            let position = excelObj[i][4];
            //执行sql

            let row = new AdmissionList();
            row = Object.assign({}, req.body);
            row.enroll_time = new Date();
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

        }




    });



    /**
     * 删除录取学生信息
     * @group 录取名单管理接口
     * @route DELETE /admissionList/delete
     * @summary 删除录取学生信息
     * @param {string} Cookie.header                  用户登录cookie
     * @param {Array} ids.formData                    预报名学生ids
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.delete('/delete', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:admissionList:delete', req.cookies.JSESSIONID);
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
   * 修改录取学生信息
   * @group 录取名单管理接口
   * @route POST /admissionList/update
   * @summary 修改录取学生信息
   * @param {string} Cookie.header                  用户登录cookie
   * @param {Array} id.formData                     预报名学生id
   * @param {string} student_name.formData          学生姓名
   * @param {int} student_card.formData             学生身份证号
   * @param {int} gender.formData                   性别,0-男，1-女
   * @param {int} phone.formData                    手机号
   * @param {int} gradeid.formData                 批次/年级id
   * @param {timestamp} school_id.formData          学校id
   * @param {timestamp} major_id.formData           专业id
   * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
   * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
   * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
   * @returns {error} default - {success: false,code: code,data: data,message: message}
   */

    router.post('/update', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:admissionList:update', req.cookies.JSESSIONID);
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
 * 根据条件查看录取名单信息
 * @group 录取名单管理接口
 * @route POST /admissionList/list
 * @summary 根据条件查看录取名单信息
 * @param {string} Cookie.header                  用户登录cookie
 * @param {string} student_name.formData          学生姓名
 * @param {int} student_card.formData             学生身份证号
 * @param {int} gender.formData                   性别,0-男，1-女
 * @param {int} phone.formData                    手机号
 * @param {int} gradeid.formData                 批次/年级id
 * @param {timestamp} school_id.formData          学校id
 * @param {timestamp} station_id.formData         函授站id
 * @param {timestamp} major_id.formData           专业id
 * @param {int} learn_way.formData                学习形式，2-全日制，1-函授，0-业余 
 * @param {int} education_level.formData          学历层次，2-专升本，1-高起本，0-高起专
 * @param {int} status.formData                   预报名状态 1-正常，0-已撤销
 * @param {int} page.formData                     //页号 page>=1
 * @param {int} rows.formData                     //行数 rows>=0
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
router.post('/list', async (req: any, res: any) => {
    //权限
    try {
        let auth = await status.authority('sys:admissionList:list', req.cookies.JSESSIONID);
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

    if (!status.verify_parameters(req.body.gradeid)) {
        where = where + " AND gradeid= '" + req.body.gradeid + "'";
    } else {
        res.jsonp(status.error(400, "学校id和年级id不能为空", "查找录取学生信息失败"));
        res.end();
        return;
    }

    if (!status.verify_parameters(req.body.school_id)) {
        where = where + " AND school_id= '" + req.body.school_id + "'";
    } else {
        res.jsonp(status.error(400, "学校id和年级id不能为空", "查找录取学生信息失败"));
        res.end();
        return;
    }

    if (!status.verify_parameters(req.body.student_name)) {
        where = where + " AND student_name= '" + req.body.student_name + "'";
    }


    if (!status.verify_parameters(req.body.student_card)) {
        where = where + " AND student_card= '" + req.body.student_card + "'";
    }


    if (!status.verify_parameters(req.body.phone)) {
        where = where + " AND phone= '" + req.body.phone + "'";
    }



    if (!status.verify_parameters(req.body.major_id)) {
        where = where + " AND major_id= '" + req.body.major_id + "'";
    }


    if (!status.verify_parameters(req.body.learn_way)) {
        where = where + " AND learn_way= '" + req.body.learn_way + "'";
    }


    if (!status.verify_parameters(req.body.education_level)) {
        where = where + " AND education_level= '" + req.body.education_level + "'";
    }


    if (!status.verify_parameters(req.body.status)) {
        where = where + " AND status= '" + req.body.status + "'";
    }

    let sql_ret: any;
    try {
        let sql = "SELECT * FROM beforehand_applicants WHERE " + where + " LIMIT " + rows + " OFFSET " + offset;
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