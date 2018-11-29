$(function () {
    var mmb = new Mmb();
    mmb.queryCouponProduct();
    mmb.maskShow();
    mmb.maskClose();
})



var Mmb = function () {

};

Mmb.prototype = {
    // 请求优惠券列表的公共函数
    getCouponProduct: function (callback) {
        var that = this;
        $.ajax({
            url: "http://localhost:9090/api/getcouponproduct",
            data: {
                couponid: that.getQueryString('couponId'),
            },
            success: function (data) {
                callback(data);
            }
        });
    },

    //获取优惠券列表
    queryCouponProduct: function () {
        var that = this;
        that.getCouponProduct(function (data) {
            var html = template("getcouponTpl", data);
            $('.product-list').html(html);
        });
    },

    //点击优惠券,显示遮罩层和里面的轮播图
    maskShow: function () {
        var that = this;
        $('.product-list').on('tap', 'li', function () {
            $('.mask').css("display", "block");
            $("body").css("overflow","hidden");
            that.getCouponProduct(function (data) {
                var html = template("sliderTpl", data);
                $('#slide .mui-slider').html(html);
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            })
        })
    },

    //遮罩层的隐藏
    maskClose: function () {
        $(".mask .close").on('tap', function () {
            $('.mask').css("display", "none");
            
            $("body").css("overflow","auto");
        })
    },
    
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}