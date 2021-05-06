import { Redisdb } from "../db/redisclass";
//redis 获得权限
const redis_permission = new Redisdb();

export class Status {

    success(code: number, data: any) {
        return {
            success: true,
            code: code,
            data: data,
            message: "操作成功"
        }
    }

    error(code: number, data: any, message: String) {
        return {
            success: false,
            code: code,
            data: data,
            message: message
        }
    }

    verify_parameters(params: any) {

        if (typeof params == 'undefined' || params == "" || params == null) {
            return 1;

        } else {

            return 0;
        }
    }
    async authority(authority: string, session: any) {

        
        let Authority1 ={
            code : 200,
            data : "不启用权限",
            message: authority
        }
        return Authority1;

        let Authority ={
            code : 403,
            data : "无权限",
            message: authority
        }
        
        let redisKey = "spring:session:" + session;
        let permission:any;
        try {
            permission= await redis_permission.get(0, redisKey);    
        } catch (error) {
            let Authority ={
                code : 500,
                data : "redis 连接错误",
                
            }
            return Authority;
        }
        
        console.log("permission",permission);
        let json = JSON.parse(permission + "");
        if (this.verify_parameters(permission)) {
            Authority.code = 412;
            Authority.data = "请先登录";
            Authority.message = "authority:客户端请求信息的先决条件错误";
            return Authority;
        }else{
            for (let i: number = 0; i < json.permission.length; i++) {
                if (authority == json.permission[i].authority) {
                    Authority.code = 200;
                    Authority.data = "操作权限确认";
                    Authority.message = authority;
                    return Authority;
                }
            }
        
        }
        
        return Authority;
        
    }

}