var main =require('./routes/main');

//展示index页面
module.exports=function(app){
    //main
    app.get('/',main.auth,main.index);
}
