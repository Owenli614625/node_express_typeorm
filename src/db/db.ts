var mysql = require('mysql');
//import { mysql } from "mysql";
var config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'education'
}
var pool = mysql.createPool(config);

export class Sqldb{

    //异步查询
    asynquery(sql: String, callback: Function) {
       
        pool.getConnection(function (err: any, conn: any) {
            if (err) {
                callback(err, null, null);
            } else {
                let  values: any;
                conn.query(sql, values, function (qerr: any, vals: any, fields: any) {
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(qerr, vals, fields);
                });
                
            }
        });
    }

    //同步查询
    query(sql: String, param: Array<any>) {
        // 返回一个 Promise
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err: any, connection: any) {
                if (err) {
                    reject(err);
                } else {
                    connection.query(sql, param, (err: any, rows: any) => {

                        if (err) {
                            let error = {
                                code: 500,
                                errno: err.errno,
                                sqlMessage: err.sqlMessage,
                                sqlState: err.sqlState,
                                index: err.index,
                                sql: err.sql,
                            };
                            reject(error);
                        } else {
                            //success
                            
                            resolve(rows)
                        }
                        // 结束会话
                        connection.release()
                    })
                }
            })
        })
    }

    //增，删，改
    execute(sql: String, param: Array<any>) {
        // 返回一个 Promise
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err: any, connection: any) {
                if (err) {

                    reject(err);
                } else {
                    connection.query(sql, param, (err: any, rows: any) => {

                        if (err) {
                            
                            let error = {
                                code: 500,
                                errno: err.errno,
                                sqlMessage: err.sqlMessage,
                                sqlState: err.sqlState,
                                index: err.index,
                                sql: err.sql,
                            };
                            reject(error);
                            
                        } else {
                            
                            resolve(rows)
                        }
                        // 结束会话
                        connection.release()
                    })
                }
            })
        })
    }


}

