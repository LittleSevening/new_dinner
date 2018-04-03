/*
*Get home page
*/
const express=require('express');
const fs = require('fs');
const path = require('path');
//数据库暂时用不到const db = require('fs');
const util = require('util');//上传文件目录用的
const mysql=require('mysql');
//const dataformat = require('dataformat');
const turnJson = require('../lib/turnJson');
//const config = require('../global').config;这个有问题啊。。以后怎么改额

// mongoskin databse bind暂时没用 直接抄的
//mysql

var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'newdinnerdb'
});
var sql='SELECT * FROM menu_table ORDER BY menu_class ASC,ID ASC';
var class_list=[];
module.exports=function(){
    var router=express.Router();
    router.get('/index',function(req,res){
        //获取数据库中所有的功能菜单
        connection.query(sql,function(err,data){
            if(err){
                res.send(err).end();
            }else{
                //数据判断
                //for(var i=0;i<data.length;i++){
                //    if(data[i].menu_class!=data[i].menu_class;
                //}
                  res.render('index',{json:turnJson(data,0),admin:'食饭记'});
                //console.log('data:'+data.length+turnJson(data).length);
                //res.send(turnJson(data,0)).end();
            }
        });
    });
    return router;
};
