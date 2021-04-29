var express = require('express');
import { createConnection } from "typeorm";
import { Sys_permission } from "../entity/Sys_permission";
import { Status } from "../base/statue";
import { Sqldb } from "../db/db";

const router = express.Router();
const status = new Status();
const sqldb = new Sqldb();

createConnection(/*sys_permission*/).then(async connection => {

    let Repository = connection.getRepository(Sys_permission);

    router.post('/add', async (req: any, res: any) => {

        //权限
        // try {
        //     let auth = await status.authority('sys:exam:list', req.cookies.JSESSIONID);
        //     if (auth.code == 500) { res.jsonp(auth); res.end(); return; }
        // } catch (error) {
        //     console.log(error);
        // }

        //执行sql
        let obj = new Sys_permission();
        obj = Object.assign({}, req.body);
        obj.create_time=new Date();
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


    router.post('/delete', async (req: any, res: any) => {

        //权限
        // try {
        //     let auth = await status.authority('sys:exam:list', req.cookies.JSESSIONID);
        //     if (auth.code == 500) { res.jsonp(auth); res.end(); return; }
        // } catch (error) {
        //     console.log(error);
        // }
        
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

    router.get('/all', async (req: any, res: any) => {

        //权限
        try {
            let auth = await status.authority('sys:exam:list', req.cookies.JSESSIONID);
            if (auth.code != 200) { res.jsonp(auth); res.end(); return; }
        } catch (error) {
            console.log(error);
        }
        
        //执行sql
        let sql_re:any;
        sql_re = await Repository.findAndCount();
        res.jsonp(status.success(200, sql_re));
        res.end();
    });


}).catch(error => console.log(error));

module.exports = router;   /*暴露这个 router模块*/