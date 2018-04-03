const crypto=require('crypto');
const db=require('../mysql');

module.exports={
    MD5_SUFFIX:'我就是个大俊子帅嘻嘻',
    MD5: function(str){
        var obj=crypto.createHash('md5');//指定签名方法是md5
        obj.update(str);
        return obj.digest('hex');//指定以数字的、十六进制的方式返回已加密的文本
    },
    getProject: function(){
      var sql='SELECT text FROM framwork_table WHERE class=1';
      db.query(sql,(err,data)=>{
        if(err){
          return err;
        }else{
          return data;
        }
      });
    },
    getDepartment:function(){
      var sql='SELECT text FROM framwork_table WHERE class=2';
      db.query(sql,(err,data)=>{
        if(err){
          return err;
        }else{
          return data;
        }
      });
    }

};
