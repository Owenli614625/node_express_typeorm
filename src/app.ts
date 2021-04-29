var express = require('express');
let bodyParser = require('body-parser');
import "reflect-metadata";
let swaggeroOptions=require('./base/swagger');
var cookieParser = require('cookie-parser');

//创建服务器程序
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//添加路由模块
let user=require('./router/user');
let exam=require('./router/exam');
let examItemLibrary=require('./router/examItemLibrary');
let sys_permission=require('./router/sys_permission');
app.use('/user',user);
app.use('/exam',exam);
app.use('/examItemLibrary',examItemLibrary);
app.use('/sys_permission',sys_permission);

//代码测试区域
let time=new Date();
console.log("Server start time",time);
//代码测试区域
//接口文档
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(swaggeroOptions);





app.listen(3000, function() {
    console.log("server listening at port 3000");
});


