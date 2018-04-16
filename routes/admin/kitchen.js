const express=require('express');
const common=require('../../lib/common');
const db=require('../../mysql');
const config=require('../../global.js').config;

module.exports=function(){
  var router=express.Router();

  router.get('/',(req,res)=>{
    switch(req.query.act){

      case 'update':
      break;
      case 'menu_add':
      db.query('SELECT * FROM ingredient_table',(err,data)=>{
        if (err) {
          res.status(500).send(err).end;
        }else{
          db.query('SELECT class FROM ingredient_table GROUP BY class',(err,class_list)=>{
            if(err){
              res.status(500).send(err).end;
            }else{
              res.render('menu-add.ejs',{note:null,json:req.session['admin_menu'],admin:config.company,ingredient_list:data,class_list});
            }
          });
        }
      });
      break;
      case 'menu_add_ingrendient':
      db.query('SELECT * FROM ingredient_table',(err,data)=>{
        if (err) {
          res.status(500).send(err).end;
        }else{
          res.render('menu-add.ejs',{note:null,json:req.session['admin_menu'],admin:config.company,ingredient_list:data});
        }
      });
      break;
      default:
      //现实所有菜品列表
      db.query('SELECT * FROM dishs_table ',function(err,data){
        if(err){
          res.render('menu_list.ejs',{note:'数据访问出错',json:null,admin:config.company});
        }else{
          res.render('menu_list.ejs',{json:req.session['admin_menu'],admin:config.company,data:data,note:null});
        }
      });
      break;
    }
  });

  return router;
}
