const express=require('express');
const common=require('../../lib/common');
const db=require('../../mysql');
const config=require('../../global.js').config;

module.exports=function(){
  var router=express.Router();

  router.get('/',function(req,res){
    switch(req.query.act){
      case 'update':
          db.query('SELECT * FROM user_table WHERE id="'+req.query.id+'"',function(err,data){
            if(data==null|err){
              res.render('update-user.ejs',{json:req.session['admin_menu'],admin:configs.company,data:null,note:'没有找到用户数据'+err,listProject:null,listDepartment:null});
            }else{
              var listPorject=[];
              db.query(common.getColumn('porject'),(err,porject)=>{
                if(err){
                    listPorject=['无法获取项目部列表'];
                    res.status(404).send('无法获取项目部列表').end();
                }else{
                    for(var i=0;i<porject.length;i++){
                      listPorject.push(porject[i]['porject']);
                    }
                    console.log(porject,listPorject);
                    var listDepartment=[];
                    db.query(common.getColumn('department'),(err,department)=>{
                      if(err){
                          listDepartment=['无法获取部门列表'];
                          res.status(404).send('无法获取部门列表').end();
                      }else{
                          for(var j=0;j<department.length;j++){
                            listDepartment.push(department[j]['department']);
                          }
                          console.log(listDepartment);
                            res.render('update-user.ejs',{json:req.session['admin_menu'],admin:config.company,data:data[0],note:null,listPorject,listDepartment});
                      }
                    });
                }
              });
            }
          });
        break;
      case 'add':
        break;
      case 'delet':
        break;
      default :
        db.query('SELECT * FROM user_table ',function(err,data){
          if(err){
            res.render('user.ejs',{note:'数据访问出错',json:null,admin:config.company});
          }else{
            res.render('user.ejs',{json:req.session['admin_menu'],admin:config.company,data:data,note:null});
          }
        });
        break;
      }
  });
  router.post('/',function(req,res){
    //因为post 中无法提交act 参数 但是可以根据是否有用户ID来判断是添加还是删除数据
    if(typeof(req.body.user_id)=="undefined" ){
      //添加用户信息的post
    }else{
      var UserInfo={
          porject:req.body.porject,
          department:req.body.department,
          sex:req.body.sex,
          //othermsg
          id:req.body.user_id
      };

      var updateStr='UPDATE user_table SET \
      porject="'+ UserInfo.porject +'",\
       department="'+ UserInfo.department +' " \
       ,sex="'+UserInfo.sex+'"\
        WHERE id="'+UserInfo.id+'"';

      db.query(updateStr,(err,data)=>{
          if(err){
              res.send(err).end();
          }else{
              res.send('<script type="text/javascript"> window.onload=function() { alert("数据修改成功！！");window.location.href="user" } </script>').end;
              //提示信息更新成功并跳转到user页面
          }
      });
    }

  });

  return router;
};
