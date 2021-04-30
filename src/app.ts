var express = require('express');
let bodyParser = require('body-parser');
import "reflect-metadata";
let swaggeroOptions=require('./base/swagger');
var cookieParser = require('cookie-parser');

//创建服务器程序
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));  //扩展回影响request.body
app.use(bodyParser.json());
app.use(cookieParser());
var path = require('path');
//添加路由模块
let user=require('./router/user');
let exam=require('./router/exam');
let examItemLibrary=require('./router/examItemLibrary');
let sys_permission=require('./router/sys_permission');
app.use('/user',user);
app.use('/exam',exam);
app.use('/examItemLibrary',examItemLibrary);
app.use('/sys_permission',sys_permission);
app.use(express.static(path.join(__dirname, 'public')));
//代码测试区域
let time=new Date();
console.log("Server start time",time);
//代码测试区域
//接口文档
const expressSwagger = require('express-swagger-generator')(app);

expressSwagger(swaggeroOptions);

//解决跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    //返回数据格式为json字符串
    res.header("Content-Type", "application/json;charset=utf-8");
    //返回数据格式设置为html文档
    // res.header("Content-Type", "text/html;charset=utf-8");
    next();
  });




app.listen(3000, function() {
    console.log("server listening at port 3000");
});


