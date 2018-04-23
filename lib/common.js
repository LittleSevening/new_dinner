const crypto=require('crypto');
const db=require('../mysql.js');

module.exports={
    MD5_SUFFIX:'我就是个大俊子帅嘻嘻',
    MD5: function(str){
        var obj=crypto.createHash('md5');//指定签名方法是md5
        obj.update(str);
        return obj.digest('hex');//指定以数字的、十六进制的方式返回已加密的文本
    },
    getColumn: function(column){
      var queryStr='SELECT '+ column +' FROM user_table GROUP BY '+ column +'';
      return queryStr;
    },
    //将时间转换的函数
    turnDate:function(data){
      for(item in data){
        var unixTimestamp = new Date( data[item].creat_time*1000 ) ;
        commonTime = unixTimestamp.toLocaleString();
        data[item].creat_time=commonTime;
      }
      return data;
    },
    //获取配料的函数
    trunIngre:function(data){
      //需要配料表中 对应的配料图像支持
      //不过暂时可以分析 配料数据信息：2018年4月23日
      //哎。。日了狗了 要用到回调访问数据库 没法将信息写在函数返回值里；。。。
      return data;
    }


};
