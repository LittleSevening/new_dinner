const express=require('express');
const common=require('../../lib/common');
const db=require('../../mysql');
const config=require('../../global.js').config;

module.exports=function(){
  var router=express.Router();

  router.get('/',(req,res)=>{
    switch(req.query.act){

      case 'update':
      db.query('SELECT * FROM dishs_table WHERE id="'+req.query.id+'"',function(err,data){
        if(data==null|err){
          res.render('update-menu.ejs',{json:req.session['admin_menu'],admin:config.company,data:null,note:'没有找到用户数据'+err,listProject:null,listDepartment:null});
        }else{
          var listProject=common.getColumn('porject');//还没做数据验证内
          console.log(common.getColumn('porject'));
          if(listProject!=null){
              listProject=listProject;
          }else{
              listProject='无法获取项目部目录';
          }

          var listDepartment=common.getColumn('department');
          if(listDepartment!=null){
              listDepartment=listDepartment;
          }else{
              listDepartment='无法获取项目部目录';
          }
          //res.send(data);
          res.render('update-menu.ejs',{json:req.session['admin_menu'],admin:config.company,data:data[0],note:null,listProject,listDepartment});
        }
      });
      break;
      case 'menu_add':
      //定义添加菜品的路由
      db.query('SELECT * FROM ingredient_table',(err,data)=>{
        var ingredient_list=[];
        if (err) {
          res.status(500).send(err).end;
        }else{
          for (var i = 0; i < data.length; i++) {
            ingredient_list.push(data[i]);
          }
          db.query('SELECT class FROM ingredient_table GROUP BY class',(err,class_arr)=>{
              if(err){
                  res.status(500).send(err).end;
              }if(class_arr==null){
                  res.status(500).send(err).end;
              }else{
                  console.log(req.query);
                  res.render('menu-add.ejs',{note:null,json:req.session['admin_menu'],admin:config.company,ingredient_list,class_arr,dish_title:req.query.dish_title});
                  //res.send(ingredient_list).end();
              }
          });
        }
      });
      break;
      case 'menu_add_ingredient':
      //包括菜品对应的配额和营养价值表
      db.query('SELECT * FROM ingredient_table',(err,data)=>{
        var ingredient_list=[];
        if (err) {
          res.status(500).send(err).end;
        }else{
          for (var i = 0; i < data.length; i++) {
            ingredient_list.push(data[i]);
          }
          db.query('SELECT class FROM ingredient_table GROUP BY class',(err,class_arr)=>{
              if(err){
                  res.status(500).send(err).end;
              }if(class_arr==null){
                  res.status(500).send(err).end;
              }else{
                  console.log(req.query);
                  res.render('menu-add.ejs',{note:null,json:req.session['admin_menu'],admin:config.company,ingredient_list,class_arr,dish_title:req.query.dish_title});

              }
          });
        }
      });
      break;
      default:
      db.query('SELECT * FROM dishs_table ',function(err,data){
        if(err){
          res.render('menu_list.ejs',{note:'数据访问出错',json:null,admin:config.company});
        }else{
          //需要处理数据信息
          res.render('menu_list.ejs',{json:req.session['admin_menu'],admin:config.company,data:common.turnDate(data),note:null});
        }
      });
      break;
    }
  });
  router.post('/',(req,res)=>{
    if(typeof req.body.dish_id !=undefined){
      var dish_title=req.body.dishtitle;
      var price=req.body.price;
      var ingredient=req.body.ingredient;
      var creat_time= Date.parse(new Date())/1000;

      var insertStr="INSERT INTO dishs_table (dish_title,price,ingredient,creat_time) VAlUES(\
      '"+ dish_title +"',\
      "+ price +",\
      '"+ ingredient +"',\
      "+ creat_time +")";
      db.query(insertStr,(err,data)=>{
        if(err){
          console.log(insertStr);
          res.status(500).send('数据通信错误:'+err+'/'+insertStr).end;
        }else{
          res.send('<script type="text/javascript"> window.onload=function() { alert("数据修改成功！！");window.location.href="kitchen" } </script>').end();
        }
      });
    }
  });
  return router;
}
