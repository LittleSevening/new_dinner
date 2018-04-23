const express=require('express');
const common=require('../../lib/common');
const db=require('../../mysql');
const config=require('../../global.js').config;

module.exports=function(){
  var router=express.Router();
  router.get('/',(req,res)=>{
    res.render('charts.ejs',{json:req.session['admin_menu'],admin:config.company});
  });
  return router;
}
