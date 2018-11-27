$(function(){
    $.ajax ({
        url: "http://localhost:9090/api/getindexmenu",
        success: function(obj){
            obj.result.unshift({name:"首页",titlehref:"index.html"});
           var html = template("navTpl",obj);
           $('.nav ul').html(html);
        }
    });
})