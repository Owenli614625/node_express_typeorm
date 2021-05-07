var express = require('express');
import { createConnection } from "typeorm";
import { PaymentInfo } from "../entity/PaymentInfo";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var multiparty = require('multiparty');
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();

createConnection(/*PaymentInfo*/).then(async connection => {

    let Repository = connection.getRepository(PaymentInfo);

    /**
     * 添加缴费一条信息
     * @group 缴费信息接口
     * @route POST /paymentInfo/add
     * @summary 添加缴费一条信息 
     * @param {string} Cookie.header                  用户登录cookie
     * @param {string} Student_number.formData        学生学号
     * @param {string} Student_card.formData          学生身份证号
     * @param {string} payment_summary.formData       缴费概要
     * @param {int} amount_due.formData               应缴金额
     * @param {int} actual_payment.formData           实缴金额
     * @param {string} payment_method.formData        缴费方式
     * @param {string} Payment_invoice.formData       缴费发票单号
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:paymentInfo:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let obj = new PaymentInfo();
        obj = Object.assign({}, req.body);
        obj.payment_time = new Date();
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
     * 删除缴费信息
     * @group 缴费信息接口
     * @route delete /paymentInfo/delete
     * @summary 删除缴费信息 
     * @param {string} Cookie.header                  用户登录cookie
     * @param {string} ids.formData                    权限ids
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.delete('/delete', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:paymentInfo:delete', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        try {
            let ids: any = req.body.ids;
            for (let i: number = 0; i < ids.length; i++) {
                let row = await Repository.findOne(ids[i]);
                await Repository.remove(row);
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
     * 修改缴费一条信息
     * @group 缴费信息接口
     * @route POST /paymentInfo/update
     * @summary 修改缴费一条信息 
     * @param {string} Cookie.header                  用户登录cookie
     * @param {string} id.formData                    缴费id
     * @param {string} Student_number.formData        学生学号
     * @param {string} Student_card.formData          学生身份证号
     * @param {string} payment_summary.formData       缴费概要
     * @param {int} amount_due.formData               应缴金额
     * @param {int} actual_payment.formData           实缴金额
     * @param {string} payment_method.formData        缴费方式
     * @param {string} Payment_invoice.formData       缴费发票单号
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

    router.post('/update', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:paymentInfo:update', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let sql_ret: any;
        try {
            let row = await Repository.findOne(req.body.id);
            row = Object.assign({}, req.body);
            row.payment_time = new Date();
            await Repository.save(row);
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
   * 查看缴费信息
   * @group 缴费信息接口
   * @route POST /paymentInfo/list
   * @summary 查看缴费信息 
   * @param {string} Cookie.header                  用户登录cookie
   * @param {string} Student_number.formData        学生学号
   * @param {string} Student_card.formData          学生身份证号
   * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
   * @returns {error} default - {success: false,code: code,data: data,message: message}
   */

router.post('/list', async (req: any, res: any) => {

    //权限
    try {
        let auth = await status.authority('sys:paymentInfo:list', req.cookies.JSESSIONID);
        if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
    } catch (error) {
        console.log(error);
    }

    let where = " 1=1 ";

    if (!status.verify_parameters(req.body.Student_number)) {
        where = where + " AND Student_number= '" + req.body.Student_number + "'";
    }

    if (!status.verify_parameters(req.body.Student_card)) {
        where = where + " AND Student_card= '" + req.body.Student_card + "'";
    }

    let sql_ret: any;
    try {
        let sql = "SELECT * FROM payment_info WHERE"+where;
        console.log(sql);
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