
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


module.exports = options;