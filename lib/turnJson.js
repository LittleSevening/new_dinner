/**
*转化json数据库中的menu_table为json树
**/

//var list=[{"ID":1,"menu_text":"主控台","menu_class":0,"menu_url":"index","father":0,"menu_icon":null},{"ID":2,"menu_text":"用户管理","menu_class":0,"menu_url":"index","father":0,"menu_icon":null},{"ID":3,"menu_text":"组织机构","menu_class":0,"menu_url":"index","father":2,"menu_icon":null},{"ID":4,"menu_text":"菜品管理","menu_class":1,"menu_url":"menu","father":9,"menu_icon":null},{"ID":5,"menu_text":"周菜单","menu_class":1,"menu_url":"menu","father":9,"menu_icon":null},{"ID":6,"menu_text":"计量单位","menu_class":1,"menu_url":"menu","father":9,"menu_icon":null},{"ID":7,"menu_text":"预约参数","menu_class":1,"menu_url":"menu","father":9,"menu_icon":null},{"ID":9,"menu_text":"后厨主控台","menu_class":1,"menu_url":"cook","father":0,"menu_icon":null},{"ID":13,"menu_text":"文章推送","menu_class":1,"menu_url":"artical","father":0,"menu_icon":null},{"ID":8,"menu_text":"订单列表","menu_class":2,"menu_url":"order","father":0,"menu_icon":null},{"ID":10,"menu_text":"测评及调查","menu_class":3,"menu_url":"test","father":0,"menu_icon":null},{"ID":11,"menu_text":"留言","menu_class":3,"menu_url":"msg","father":10,"menu_icon":null},{"ID":12,"menu_text":"调查问卷","menu_class":3,"menu_url":"testlist","father":10,"menu_icon":null}];

function treeNode(ID,menu_text,menu_class,menu_url,menu_icon,father,children) {
    this.ID = ID;
    this.menu_text=menu_text;
    this.menu_class=menu_class;
    this.menu_url=menu_url;
    this.menu_icon=menu_icon;
    this.father=father;

    this.children = children;//子节点
}
//var json=[];
function getTree(list,num){
    var json=[];
    for(var i=0;i<list.length;i++){

        if(list[i].father==num){
            //递归
            var tree=new treeNode(
                list[i].ID,
                list[i].menu_text,
                list[i].menu_class,
                list[i].menu_url,
                list[i].menu_icon,
                list[i].father,
                getTree(list,list[i].ID)
            );
            json.push(tree);
            //console.log(i+'添加'+tree.menu_text+'到j'+json[json.length-1].menu_text+'中');
        }
    }

    //cosole.log(json);//测试用，显示一下

    return json;
};
module.exports = getTree;//导出json树方法
//var newTree=getTree(list,0);
//console.log(newTree[0].children);
