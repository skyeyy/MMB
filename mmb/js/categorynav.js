$(function() {
    var mmb = new MMB();
    mmb.getcategorytitle();
    mmb.productlist();
    // console.log(mmb);
})


// 创建一个慢慢卖的构造函数
var MMB = function() {};

MMB.prototype = {
    // 获取分类标题 发送请求
    getcategorytitle: function() {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getcategorytitle',
            success: function(data) {
                // console.log(data);
                var html = template('categorytitleTpl', data);
                $('.categorybox').html(html);
                // console.log($('.categoryli'));
                $('.categoryli').on('tap',function(){
                  // console.log($(this).parent('.mui-active').length);  
                  if($(this).parent('.mui-active').length){
                  $('.categoryli').find('.icondownup').toggleClass('mui-icon-arrowup').toggleClass('mui-icon-arrowdown');
                  }else{
                    $('.categoryli').find('.icondownup').toggleClass('mui-icon-arrowup').toggleClass('mui-icon-arrowdown');
                  }

                
                })
                // 遍历id 循环渲染
                var title = $('.topproductnavtitle');
                var titleidlist = [];
                for (var i = 0; i < title.length; i++) {
                    // console.log(title);
                    // console.log(title[i]);
                    var titleid = $(title[i]).attr('data-titleId');
                    // console.log(titleid);
                    titleidlist.push(titleid);
                };
                // console.log(titleidlist);
                // console.log(titleidlist[0]);
                for (var i = 0; i < titleidlist.length; i++) {
                    that.getcategory(titleidlist[i])
                };
            }

        })
    },
    //渲染商品列表
    getcategory: function(id) {
        $.ajax({
            url: 'http://localhost:9090/api/getcategory',
            data: { titleid: id },
            success: function(data) {
                // console.log(data);
            var html = template('categorylistTpl', data);
            $('.categorylist' + id).html(html);
            }
        })
    },
    //商品点击跳转列表 传参
    productlist: function(){
      $('.categorybox').on('tap','.btn-product',function(){
       var categoryId = $(this).attr('data-categoryId');
       var title = $(this).parent().attr('data-title');
       title = title.replace(/\s/g, '');
       // console.log(title);
       // alert("categoryId="+categoryId+"titleId="+titleId)
        location = "productList.html?categorytitle="+title+"&categoryId="+categoryId
      })
    }

    
}








// $(function () {
//  var mmb = new MMB();
//  mmb.getIndexMenu();
//  mmb.getDiscountProduct();
// });

// var MMB = function () {

// }
// MMB.prototype = {
//  baseURL:'http://localhost:9090',
//获取首页菜单的函数
// getIndexMenu:function () {
//  $.ajax({
//    url:this.baseURL+'/api/getindexmenu',
//    success:function (data) {
//      var html = template('indexMenuTpl',data);
//      $('#nav .mui-row').html(html);
//    }
//  })
// },
//获取首页折扣商品
//  getDiscountProduct:function () {
//    $.ajax({
//      url:this.baseURL+'/api/getmoneyctrl',
//      success:function (data) {
//        console.log(data);
//        var html = template('discountProductTpl',data);
//        $('#productList .content ul').html(html);
//      }
//    })
//  }
// }
