$(function(){
    $.fn.nextAll = function (selector) {
        var nextEls = [];
        var el = this[0];
        if (!el) return $([]);
        while (el.nextElementSibling) {
          var next = el.nextElementSibling;
          if (selector) {
            if($(next).is(selector)) nextEls.push(next);
          }
          else nextEls.push(next);
          el = next;
        }
        return $(nextEls);
      };
    $.ajax ({
        url: "http://localhost:9090/api/getindexmenu",
        success: function(obj){
           var html = template("getmenuTpl",obj);
            $("#nav ul").html(html);
            $('.more').on("tap",function(){
                $('.more').nextAll().toggle();
            })
        }
    });
     
    $.ajax({
        url:"http://localhost:9090/api/getmoneyctrl",
        success:function(obj){
            var html = template("getmoneyctrlTpl",obj);
            $('#content ul').html(html);
        }
    })
    
})