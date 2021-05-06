var express = require('express');
import { createConnection } from "typeorm";
import { ReceivingBank } from "../entity/Receivingbank";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";
var multiparty = require('multiparty');
const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();

createConnection(/*ReceivingBank*/).then(async connection => {

    let Repository = connection.getRepository(ReceivingBank);


    /**
     * 添加一个收款账号
     * @group 收款账号接口
     * @route POST /receivingBank/add
     * @summary 添加一个收款账号 
     * @param {string} Cookie.header                               用户登录cookie
     * @param {string} Alipay_account.formData                     支付宝收款账号
     * @param {string} weixin_account.formData                     微信收款账号
     * @param {int} Collection_organization.formData               收款组织
     * @param {int} user_name.formData                             收款人姓名
     * @param {string} bank_name.formData                          银行名称
     * @param {string} bank_number.formData                        银行卡账号
     * @param {string} bank_address.formData                       开户行省市
     * @param {string} Detailed_address.formData                   开户行名称-详细地址
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.post('/add', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:receivingBank:add', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }

        //执行sql
        let obj = new ReceivingBank();
        obj = Object.assign({}, req.body);
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
     * 删除收款账号
     * @group 收款账号接口
     * @route DELETE /receivingBank/delete
     * @summary 删除收款账号 
     * @param {string} Cookie.header                               用户登录cookie
     * @param {Array} ids.formData                  收款方ids
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.delete('/delete', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:receivingBank:delete', req.cookies.JSESSIONID);
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
     * 修改一个收款账号
     * @group 收款账号接口
     * @route POST /receivingBank/update
     * @summary 修改一个收款账号
     * @param {string} Cookie.header                               用户登录cookie
     * @param {Array} id.formData                                  收款方id
     * @param {string} Alipay_account.formData                     支付宝收款账号
     * @param {string} weixin_account.formData                     微信收款账号
     * @param {int} Collection_organization.formData               收款组织
     * @param {int} user_name.formData                             收款人姓名
     * @param {string} bank_name.formData                          银行名称
     * @param {string} bank_number.formData                        银行卡账号
     * @param {string} bank_address.formData                       开户行省市
     * @param {string} Detailed_address.formData                   开户行名称-详细地址
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */

     router.post('/update', async (req: any, res: any) => {
        //权限
        try {
            let auth = await status.authority('sys:exam:update', req.cookies.JSESSIONID);
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


     /**
     * 查看所有收款账号
     * @group 收款账号接口
     * @route GET /receivingBank/all
     * @summary 查看所有收款账号
     * @param {string} Cookie.header                               用户登录cookie
     * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
     * @returns {error} default - {success: false,code: code,data: data,message: message}
     */
    router.get('/all', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:receivingBank:all', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }
        let sql_re:any;
        sql_re = await Repository.findAndCount();
        res.jsonp(status.success(200, sql_re));
        res.end();
    });
});

module.exports = router;   /*暴露这个router模块*/