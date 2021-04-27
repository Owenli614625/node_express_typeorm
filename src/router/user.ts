var express = require('express');
import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { Status } from "../statue";

const router = express.Router();

let rest = new Status();


createConnection(/*user*/).then(async connection => {
    let userRepository = connection.getRepository(User);

/**
 * 添加用户信息
 * @group 用户信息接口
 * @route POST /user/add
 * @summary 添加用户信息
 * @param {string} firstName.string 新名称
 * @param {string} lastName.string  旧名称
 * @param {string} age.int       年龄
 * @param {string} phone.string     用户手机号码,库表中不可重复
 * @param {string} description.text 用户画像描述
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
    router.post('/add', async (req, res) => {

        if (verify_parameters(req.body.firstName)) {
            res.jsonp(rest.error(400, "firstName", "not null"));
            res.end();
            return;
        }

        if (verify_parameters(req.body.lastName)) {

            res.jsonp(rest.error(400, "lastName", "not null"));
            res.end();
            return;
        }

        if (verify_parameters(req.body.age)) {
            res.jsonp(rest.error(400, "age", "not null"));
            res.end();
            return;
        }

        if (verify_parameters(req.body.phone)) {
            res.jsonp(rest.error(400, "phone", "not null"));
            res.end();
            return;
        }
        let user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.phone = req.body.phone;
        user.description = req.body.description;
        user.age = 23;

        let sql_re;
        try {
            sql_re = await userRepository.save(user);
        } catch (error) {
            sql_re = error;
            res.jsonp(rest.error(error.errno, error.sqlMessage, error.code));
            res.end();
            return;
        }
        res.jsonp(rest.success(200, sql_re));
        res.send();


    });

/**
 * 通过id查用户信息
 * @group 用户信息接口
 * @route GET /user/getUser
 * @summary 通过id查用户信息
 * @param {string} id.string  通过id查用户信息
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
    router.get('/getUser', async (req, res) => {
        let sql_re;
        try {
            sql_re = await userRepository.findOne(req.body.id);
        } catch (error) {
            sql_re = error;
            res.jsonp(rest.error(error.errno, error.sqlMessage, error.code));
            res.end();
            return;
        }
        res.jsonp(rest.success(200, sql_re));
        res.send();
    });

/**
 * 查所有用户所用信息
 * @group 用户信息接口
 * @route GET /user/all
 * @summary 查所用用户所用信息
 * @param {string} null  没有参数
 * @returns {object} 200 -  { success: true,code: code,data: data,message: "操作成功"} 
 * @returns {error} default - {success: false,code: code,data: data,message: message}
 */
    router.get('/all', async (req, res) => {

        let sql_re;
        sql_re = await userRepository.findAndCount();
        res.jsonp(rest.success(200, sql_re));
        res.end();
    });


}).catch(error => console.log(error));


function verify_parameters(params) {

    if (typeof params == 'undefined' || params == "" || params == null) {
        return 1;

    } else {

        return 0;
    }
}
module.exports = router;   /*暴露这个 router模块*/