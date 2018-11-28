$(function () {
    // 1. 品牌排行模板
    // 2. 销量排行模板
    // 3. 最新评论模板
    var brandContent = new BrandContent();
    brandContent.brandRanking();
    brandContent.salesRanking();
    brandContent.commentNew();
});

// 构造函数
var BrandContent = function () {
}

BrandContent.prototype = {
    // 链接公共部分
    getURL: "http://localhost:9090",
    // 1. 品牌排行
    brandRanking: function () {
        var that = this;
        $.ajax({
            type: "get",
            url: that.getURL + "/api/getbrand",
            data: {
                brandtitleid: that.getQueryString("brandtitleid"),
                pagesize: 10
            },
            dataType: "json",
            success: function (data) {
                var html = template("brandRanktmp", data);
                $('#item1').html(html);
            }
        });
    },

    // 2. 销量排行
    salesRanking:function () {
        var that = this;
        $("#tab2").on("tap", function () {
            var bid = $(".center").data("brandtitleid");
            $.ajax({
                type: "get",
                url: that.getURL + "/api/getbrandproductlist",
                data: {brandtitleid: bid,pagesize: 10} ,
                dataType: "json",
                success: function (data) {
                    var html = template("salesRanktmp", data);
                    $("#item2").html(html);
                }
            });
        })
        
    },

    // 3. 最新评论
    commentNew: function() {
        var that = this;
        $("#tab3").on("tap", function () {
            $.ajax({
                type: "get",
                url: that.getURL + "/api/getproductcom",
                data: {
                    productid:  that.getQueryString("brandtitleid")
                },
                dataType: "json",
                success: function (data) {
                    var html = template("commentNewtmp", data);
                    $("#item3").html(html);
                }
            });            
        })
    },

    //专门获取地址栏参数的方法
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
}