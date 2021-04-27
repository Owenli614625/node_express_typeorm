export class Status {

    success(code : Number, data : any) {
        return {
            success: true,
            code: code,
            data: data,
            message: "操作成功"
        }
    }
    
    error(code : Number, data : any, message : String) {
        return {
            success: false,
            code: code,
            data: data,
            message: message
        }
    }
}