$(function () {  
    $.ajax({
        url: "http://localhost:9090/api/getgsshop",
        success: function (data) {  
            console.log(data);
            var html = template('getgsshopTpl',data);
            $('.nav #shop ul').html(html);
        }
    });
    $.ajax({
        url: "http://localhost:9090/api/getgsshoparea",
        success: function (data) {  
            console.log(data);
            var html = template('getgsshopareaTpl',data);
            $('.nav #area ul').html(html);
        }
    }); 
    function selectList(ele) {  
        $('.shop-list .'+ele).on('tap',function () {
            $(this).toggleClass('active').siblings().removeClass('active');
            if ($(this).hasClass('active')) {
                $('.secondary #'+ele+' ul').addClass('active');
            }else{
                $('.secondary #'+ele+' ul').removeClass('active');
            }
        })
    }
    selectList('shop');
    selectList('area');
    selectList('price')
    function selectshop(ele) {  
        // 选择二级菜单
        $('#'+ ele +' ul').on('tap','li a',function () { 
            // 获取当前元素的文本
            var html =$(this).text().trim().split('（')[0];
            // 设置导航栏的文本
            $('.'+ ele +' a').text(html);
            // 导航栏中图片文字旋转180°
            $('.shop-list .'+ ele).removeClass('active');
            // 二级菜单栏隐藏
            $('.secondary #'+ ele +' ul').removeClass('active');
            // 获取选择的二级菜单项的Id，给导航栏设置对应的Id
            var Id = $(this).data(ele+'Id');
            $('.shop-list .'+ ele).data(ele+'Id',Id);
            // 二级菜单选中项显示√，其他项隐藏
            $(this).next().css('display','block');
            $(this).parent().siblings().find('i').css('display','none');
            queryProduct();
        })
    }
    selectshop('shop');
    selectshop('area');

    function queryProduct() {  
        var shopId = $('.shop-list .shop').data('shopId') || 0;
        var areaId = $('.shop-list .area').data('areaId') || 0;
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
    // $('.shop-list .search').on('tap',function () {  
    //     queryProduct();
    //     $('.mui-scroll').css('top',0);
    // })
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    
})