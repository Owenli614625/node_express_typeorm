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
let examination=require('./router/examination');
let examItemLibrary=require('./router/examItemLibrary');
let sys_permission=require('./router/sys_permission');
let paymentInfo=require('./router/paymentInfo');
let receivingBank=require('./router/receivingBank');
let beforehandApplicants=require('./router/beforehandApplicants');
let recruitStudents=require('./router/recruitStudents');
let schoolEnrollmentPlan=require('./router/schoolEnrollmentPlan');
let approval=require('./router/approval');
let file=require('./router/file');
let admissionList=require('./router/admissionList');
let studentPhotos=require('./router/studentPhotos');
let transferApprovalConfig=require('./router/transferApprovalConfig');
let transferRecord=require('./router/transferRecord');
let xuejiChangeApprovalConfig=require('./router/xuejiChangeApprovalConfig');
let xueJiChangeRecord=require('./router/xueJiChangeRecord');

app.use('/user',user);                                                          //1 用户
app.use('/exam',examination);                                                   //2 考试
app.use('/examItemLibrary',examItemLibrary);                                    //3 题库路由
app.use('/sys_permission',sys_permission);                                      //4 权限
app.use('/paymentInfo',paymentInfo);                                            //5 缴费信息
app.use('/receivingBank',receivingBank);                                        //6 收款账号
app.use('/beforehandApplicants',beforehandApplicants);                          //7 学生预报名
app.use('/recruitStudents',recruitStudents);                                    //8 函授站招生计划申请
app.use('/schoolEnrollmentPlan',schoolEnrollmentPlan);                          //9 学校招生计划发布
app.use('/approval',approval);                                                  //10 审批接口
app.use('/file',file);                                                          //11 上传
app.use('/admissionList',admissionList);                                        //12 录取名单管理接口
app.use('/studentPhotos',studentPhotos);                                        //13 学生照片采集接口
app.use('/transferApprovalConfig',transferApprovalConfig);                      //14 转站审批流程配置接口
app.use('/transferRecord',transferRecord);                                      //15 学生转站记录接口
// app.use('/xuejiChangeApprovalConfig',xuejiChangeApprovalConfig);                //16 学籍异动审批流程配置接口
// app.use('/xueJiChangeRecord',xueJiChangeRecord);                                //17 学籍异动记录接口


//静态资源文件夹，此目录下的文件可以直接通过url获取
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

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


