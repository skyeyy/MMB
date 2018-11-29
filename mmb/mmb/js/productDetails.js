$(function () {
    //1.主体部分区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 根据url获取productid 
    var productid = getQueryString('productid');
    console.log(productid);

    // 2.渲染商品信息
    $.ajax({
        url: "http://localhost:9090/api/getproduct",
        data: {
            productid: productid
        },
        success: function (result) {
            console.log(result);
            // console.log(result.productImg);
            var html = template("productDetailTpl", result);
            $("#su-info").html(html);
        }
    })

    // 3.评论渲染
    $.ajax({
        url: "http://localhost:9090/api/getproductcom",
        data: {
            productid: productid
        },
        success: function (data) {
            console.log(data);
            // console.log(result.productImg);
            var html = template("productCommentTpl", data);
            $("#comment").html(html);
        }
    })

    // 4.返回顶部
  

})


// 使用正则写的获取url地址栏参数的方法
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
        // return unescape(r[2]);
        return decodeURI(r[2]);
    }
    return null;
}