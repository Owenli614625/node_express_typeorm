var express = require('express');
let user=require('./router/user');
let bodyParser = require('body-parser');
import "reflect-metadata";

//创建服务器程序
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//添加路由模块
app.use('/user',user);


const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: '考试端',
            title: '168教育后台接口',
            version: '1.0.0',
        },
        host: 'localhost',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    route: {
        url: '/swagger',
        docs: '/swagger.json',    //swagger文件 api
    },
    basedir: __dirname, //app absolute path
    files: ['./router/**/*.ts'] //Path to the API handle folder
};
expressSwagger(options)

app.listen(3000, function() {
    console.log("server listening at port 3000");
});


//你可以使用 QueryBuilder 构建几乎任何复杂性的 SQL 查询。例如，可以这样做：
// let photos = await connection
//   .getRepository(Photo)
//   .createQueryBuilder("photo") // 第一个参数是别名。即photos。 该参数必须指定。
//   .innerJoinAndSelect("photo.metadata", "metadata")
//   .leftJoinAndSelect("photo.albums", "album")
//   .where("photo.isPublished = true")
//   .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
//   .orderBy("photo.id", "DESC")
//   .skip(5)
//   .take(10)
//   .setParameters({ photoName: "My", bearName: "Mishka" })
//   .getMany();