const crypto=require('crypto');
const dialog=require('electron');
const db=require('../mysql.js');


module.exports={
    MD5_SUFFIX:'我就是个大俊子帅嘻嘻',
    MD5: function(str){
        var obj=crypto.createHash('md5');//指定签名方法是md5
        obj.update(str);
        return obj.digest('hex');//指定以数字的、十六进制的方式返回已加密的文本
    },
    getColumn: function(column){

        var sql='SELECT '+ column +' FROM user_table GROUP BY '+ column +'';

        db.query(sql,function(err,data){

            if(err){
                return err;
            }else{
                return data;
            }
        });
    },
    parseCommand : function(msg) {
        dialog.showMessageBox({
          title  : '上传成功'
         , type  : 'error'
         , message : '成功上传'+ msg +'条数据'
        })
    }
};
