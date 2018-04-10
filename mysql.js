const mysql=require('mysql');

//创建数据库连接池

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'dinner'//已经是固定信息了 每次使用需要更新mysql查询语句
});

//导出模板
module.exports=db;
