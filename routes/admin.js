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
const common=require('../lib/common');
const config = require('../global').config;//这个有问题啊。。以后怎么改额

// mongoskin databse bind暂时没用 直接抄的
//mysql

var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'dinner'
});

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
    //登录POST
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

                        res.redirect('/index');

                    }else{

                        res.render('login.ejs',{note:'密码输错了'});
                    }
                }

            }
        });
    });
    //用户管理界面
    router.get('/user',function(req,res){
      console.log(req.session['admin_id']);
      connection.query('SELECT * FROM user_table LIMIT 10',function(err,data){
        if(err){
          res.render('user-list.ejs',{note:'数据访问出错',json:null,admin:config.company});
        }else{
          console.log('session目录是：'+req.session['admin_menu']);
          res.render('user.ejs',{json:req.session['admin_menu'],admin:config.company,data:data,note:null});
        }
      });
    });
    //组织机构
    router.get('/framwork',function(req,res){
        connection.query('SELECT * FROM user_table',function(err,data){
          res.render('1.ejs',{json:req.session['admin_menu'],admin:config.company,data:data,note:null});
        });
    });
    //用户信息更新
    router.get('/update-user',function(req,res){
        console.log(req.query.id);
        connection.query('SELECT * FROM user_table WHERE id="'+req.query.id+'"',function(err,data){
          if(err){
            res.render('update-user.ejs',{json:req.session['admin_menu'],admin:config.company,data:null,note:err,listProject:null,listDepartment:null});
          }else{
            var listProject=common.getProject();//还没做数据验证内
            var listDepartment=common.getDepartment();
            console.log(data);
            res.render('update-user.ejs',{json:req.session['admin_menu'],admin:config.company,data:data,note:null,listProject,listDepartment});
          }
        });
    });
    return router;
};
