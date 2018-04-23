/*
*Get home page
*/
const express=require('express');
const fs = require('fs');
const path = require('path');
//数据库暂时用不到const db = require('fs');
const util = require('util');//上传文件目录用的
const mysql=require('mysql');
const turnJson = require('../lib/turnJson');
const common=require('../lib/common');
const config = require('../global').config;
const connection=require('../mysql');
const Static=require('express-static');

var class_list=[];
module.exports=function(){
    var router=express.Router();

    //主控台界面
    //检查是否登录，跳转等
    router.use((req,res,next)=>{
        if(!req.session['admin_id']&& req.url!='/login'){
            res.redirect('/login');
        }else{
            next();
        }
    });
    //主控台
    router.get('/index',function(req,res){
        //获取数据库中所有的功能菜单
        var sql='SELECT * FROM menu_table ORDER BY menu_class ASC,ID ASC';
        connection.query(sql,function(err,data){
            if(err){
                res.send(err).end();
            }else{
                  req.session['admin_menu']=turnJson(data,0);
                  res.render('index',{json:req.session['admin_menu'],admin:config.company});

                //res.send(turnJson(data,0)).end();
            }
        });
    });
    //登录请求GET

    router.get('/login',function(req,res){
        res.render('login.ejs',{note:''});
    });
    //登录POST 就是随便改了下 检测git
    router.post('/login',function(req,res){
        var username=req.body.username;
        var password=common.MD5(req.body.password+common.MD5_SUFFIX);//将收到的铭文签名
        var sql='SELECT * FROM admin_table where username="'+ username +'"';

        connection.query(sql,(err,data)=>{
            if(err){
                res.send('500'+' database ERR：'+ err).end();
            }else{
                if(data.length==0){
                    res.status(404).render('login.ejs',{note:'没有这个用户'});

                }else{
                    if(data[0].password==password){
                        req.session['admin_id']=data[0].ID;
                        console.log('id:'+req.session['admin_id']+'  用户名： '+ data[0].username +' 登录成功');//写入登录日志
                        res.redirect('/index');

                    }else{
                        console.log('正确的密码应该是：'+password+'而你的是'+data[0].password);
                        res.render('login.ejs',{note:'密码输错了'});
                    }
                }

            }
        });
    });
    //用户管理界面 框架已搭好
    router.use('/user',require('./admin/user.js')());
    router.use('/kitchen',require('./admin/kitchen.js')());
    router.use('/test',require('./admin/test.js')());
    //组织机构
    router.get('/framwork',function(req,res){
        connection.query('SELECT * FROM user_table',function(err,data){
          res.render('1.ejs',{json:req.session['admin_menu'],admin:config.company,data:data,note:null});
        });
    });
    //用户信息更新

    return router;
};
