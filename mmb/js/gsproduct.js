$(function () {  
    // var 
    $.ajax({
        url: "http://localhost:9090/api/getgsshop",
        success: function (data) {  
            console.log(data);
            var html = template('getgsshopTpl',data);
            $('.nav #item1 ul').html(html);
        }
    });
    $.ajax({
        url: "http://localhost:9090/api/getgsshoparea",
        success: function (data) {  
            console.log(data);
            var html = template('getgsshopareaTpl',data);
            $('.nav #item2 ul').html(html);
        }
    }); 


    $('.shop-list .price').on('tap',function () {
        $(this).toggleClass('active').siblings().removeClass('active');
    })

    $('.shop-list .shop').on('tap',function () {
        $(this).toggleClass('active').siblings().removeClass('active');
        if (!$(this).hasClass('active')) {
            $('.nav #item1 ul').addClass('active');
            
        }else{
            $('.nav #item1 ul').removeClass('active');
        }
        
        
    })
    $('.shop-list .city').on('tap',function () {
        $(this).toggleClass('active').siblings().removeClass('active');
        
        if (!$(this).hasClass('active')) {
            $('.nav #item2 ul').addClass('active');
        }else{
            $('.nav #item2 ul').removeClass('active');
        }
        
    })
    // 点击选择某个店铺，根据店铺名显示在导航栏里
    $('#item1 ul').on('tap','li a',function () {  
        var html = $(this).text().trim();
        $('.shop a').text(html);
        $('.shop-list .shop').removeClass('active');
        $('.nav #item1 ul').addClass('active');
        var shopId = $(this).data('shopId');
        $('.shop-list .shop').data('shopId',shopId);
        console.log(shopId);
    })

    $('#item2 ul').on('tap','li a',function () {  
        var html =$(this).text().trim().split('（')[0];
        $('.city a').text(html);
        $('.shop-list .city').removeClass('active');
        $('.nav #item2 ul').addClass('active');
        var areaId = $(this).data('areaId');
        $('.shop-list .city').data('areaId',areaId);
        console.log(areaId);
    })
    function queryProduct() {  
        var shopId = $('.shop-list .shop').data('shopId');
        var areaId = $('.shop-list .city').data('areaId');
        $.ajax({
            url: 'http://localhost:9090/api/getgsproduct',
            data: {shopid: shopId,areaid: areaId},
            success: function (data) {  
                mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
                var html = template('getgsproductTpl',data);
                $('#gsproduct ul').html(html);
            }
        })
    }
    queryProduct();
    $('.shop-list .search').on('tap',function () {  
        queryProduct();
        $('.mui-scroll').css('top',0);
    })
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    
})