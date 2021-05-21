
var log4js = require('log4js');
var logger = log4js.getLogger('redis');
var redis = require("redis");

//var client = redis.createClient('6379', '192.168.0.200');
let  redisConnectStatus=true;
var client = redis.createClient('6379', '192.168.0.200',{
    retry_strategy: function (options:any) {
        if (options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error 
            //console.log('连接被拒绝');
            redisConnectStatus=false;
        }
        // if (options.times_connected > 1) {
        //     console.log('重连时间超过1分钟');        
        // }
        // reconnect after 
        let re=Math.max(options.attempt , 1000);
        // console.log(re);
        return re;
    }

}); //支持断线重连
client.on('error', function (err) {
    logger.error('redis error：' + err);
    console.log('redis error：' + err);
    redisConnectStatus=false;
});
client.on('connect', function () {
    logger.info('redis连接成功...');
    console.log('redis连接成功...');
    redisConnectStatus=true;
});


export class Redisdb {


    /**
     *
     * @param dbNum 库号
     * @param key 键
     * @param value 值
     * @param expire 过期时间（单位：秒，可为空，为空则不过期）
     */
    set(dbNum: any, key: any, value: any, expire: any) {
        return new Promise((resolve, reject) => {
            client.select(dbNum, function (err: any) {
                if (err) {
                    logger.error('redis set 选库失败：' + err);
                    reject(err);
                } else {
                    client.set(key, value, function (err: any, result: any) {
                        if (err) {
                            logger.error('redis插入失败：' + err);
                            reject(err);
                            return
                        }
                        if (!isNaN(expire) && expire > 0) {
                            client.expire(key, parseInt(expire));
                            resolve(result);
                        }
                        
                    })
                }

            })
        })
    };
    /**
     *
     * @param dbNum 库号
     * @param key 键
     */
    get(dbNum: any, key: any) {
        return new Promise((resolve, reject) => {
            if(redisConnectStatus==false)
            {
                let result: any;
                reject(result);
            }
            client.select(dbNum, function (err: any) {
                if (err) {
                    logger.error('redis get 选库失败：' + err);
                    reject(err);
                } else {
                    client.get(key, function (err: any, result: any) {
                        if (err) {
                            logger.error('redis获取失败：' + err);
                            reject(err);
                        }
                        resolve(result);
                       
                    })
                }
            })
            
        })

    };
}





