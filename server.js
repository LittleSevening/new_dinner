/**
*Module dependencies
*/

///use strici

const express =require('express');
const path=require('path');
const routes = require('./routes');
const config = require('./global').config;
const cookieparser=require('cookie-parser');
const cookieSession=require('cookie-session');
const Static =require('express-static');
const bodyParser=require('body-parser');

var app = express();

app.use(bodyParser.urlencoded( {extended: false} ));//解析COOKIE
app.use(cookieparser());
app.use(cookieSession({
        keys:['sdfadf','asdfasdf','asdfasdsf'],
        name:'admin_id',
        maxAge:10*60*1000
    }));

app.set('views','views');
app.set('view engine','ejs');

app.use('/',require('./routes/admin.js')());//访问目录为/ 的引用main.js下面的router
app.set('port',process.env.PORT ||8080);
app.listen(8080);
    //监听端口app中的port属性
console.log("Express server listening on port "+ app.get('port'));
app.use(Static('./www'));//制定静态路径
