export class Status {

    success(code : number, data : any) {
        return {
            success: true,
            code: code,
            data: data,
            message: "操作成功"
        }
    }
    
    error(code : number, data : any, message : String) {
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
}