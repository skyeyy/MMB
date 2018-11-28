$(function(){
    // 获取优惠券的接口
    $.ajax({
        url:"http://localhost:9090/api/getcoupon",
        success:function(data){
            console.log(data);
            var html = template("couponMessageTpl",data);
            $('#nav .nav-coupon').html(html);
        }
    })
})