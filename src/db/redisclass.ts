
var log4js = require('log4js');
var logger = log4js.getLogger('redis');
var redis = require("redis");

var client = redis.createClient('6379', '192.168.0.200');
client.on('error', function (err) {
    logger.error('redis error：' + err);
});
client.on('connect', function () {
    logger.info('redis连接成功...')
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
            client.select(dbNum, function (err: any) {
                if (err) {
                    logger.error('redis get 选库失败：' + err);
                    reject(err);
                } else {
                    client.get(key, function (err: any, result: any) {
                        if (err) {
                            logger.error('redis获取失败：' + err);
                            reject(err);
                            return
                        }
                        resolve(result);
                    })
                }
            })
        })

    };
}





