var express = require('express'); //引用express框架
var path = require('path');//引用处理 路径位置的模块
var cookieParser = require('cookie-parser');//引用处理cookie的模块
var logger = require('morgan');//引用日志模块

//引入路由文件 index.js 和 users.js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();//调用express框架生成 框架对象app

//拦截非法从地址栏中进入 html页面的行为
app.use(function(req,res,next){
    if(req.originalUrl.match(/admin\/\w+.html$/i)){
        //判断url地址后面有没有.html如果有就说明 提升非法进入!
        res.send("非法进入");
    }else{
        //没有.html就通过
        next();
    }
});

//配置session
//1.引用session
var session = require('express-session');
//2.配置session
app.use(session({
    secret: 'keyboard cat',//加密字符
    resave: false,//强制保存
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60}//设置过期时间
}))

app.use(logger('dev'));//框架 调用日志模块
app.use(express.json());//框架 处理json数据
app.use(express.urlencoded({ extended: false }));//框架 处理请求的数据
app.use(cookieParser());//框架 调用cookie处理
//设置 放前端网页、css、js的文件夹 默认的文件夹是public 我们把它改成view
app.use(express.static(path.join(__dirname, 'public')));

//使用路由index.js 和 user.js
app.use('/',indexRouter);
app.use('/users',usersRouter);
app.use('/api',apiRouter);

//设置公共数据 数据名称为kk,数据值为123
app.set("kk",123);
app.set("position",__dirname)
//__dirname表示获取当前文件目录地址

module.exports = app;








































