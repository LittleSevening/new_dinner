/**
*user :Seven
* date :21/18/3
*time 19:13
*/

//var mongoskin = require ('mogonskin');

exports.config = {
    //session_secret:process.env.SESSION_SECRET ||'SESSION_SECRET',
    //cookie_secret:process.env.COOKIE_SECRET ||'COOKIE_SECRET',
    //auth_cookie_name:process.env.AUTH_COOKIE_NAME ||'canku_secret',
    //login_path:'/user/login',//用户登录地址
    //time_zone:8,//时区
    admin_user_email:process.env.ADMIN_USER_EMAIL ||'admin@admin.com',
    nodeMailer: {
        service:"Gmail",
        from: "admin@gmail.com",
        auth:{
            user:"admin@gmail.com",
            pass:"******"
        }
    },
    company:"大俊子公司"

};
//exports.database=mogonskin.db(process.env.MONGOLAB_URI ||"mogondb://localhost/canku");//数据库连接串

exports.runtime={};
