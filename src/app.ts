var express = require('express');
let bodyParser = require('body-parser');
import "reflect-metadata";
let swaggeroOptions=require('./swagger');


//创建服务器程序
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//添加路由模块
let user=require('./router/user');
let exam=require('./router/exam');
app.use('/user',user);
app.use('/exam',exam);


const expressSwagger = require('express-swagger-generator')(app);


expressSwagger(swaggeroOptions);



app.listen(3000, function() {
    console.log("server listening at port 3000");
});


