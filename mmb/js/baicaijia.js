$(function () {
    var mmb = new Mmb();
    mmb.getMenu();
    mmb.getProduct();
    mmb.getAjax(0);
    // mmb.getBtn();
})

var Mmb = function () {}
Mmb.prototype = {
    //发动请求,生成菜单
    getMenu: function () {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getbaicaijiatitle',
            success: function (result) {
                var html = template('productMenu', result);
                $('#header .nav ul').html(html);
                //点击某个li标签时,给他添加一个类
                $('.nav ul li').on('tap',function() {
                    $(this).addClass('active').siblings().removeClass('active');
                })

            }
        })
    },

    //发送请求,生成商品详情
    getProduct: function () {
        var that = this;
        //商品标题的点击事件  li标签动态生成需要事件委托
        $('.nav ul').on('tap', 'li', function () {
            var Id = $(this).data('id');
            that.getAjax(Id);
        });
    },

    //封装ajax
    getAjax: function (Id) {
        $.ajax({
            url: 'http://localhost:9090/api/getbaicaijiaproduct',
            data: {
                titleid: Id
            },
            success: function (result) {
                var html = template('peoductList', result);
                $('#main ul').html(html);
            }
        })
    },

    //上拉刷新,下拉加载
    // pullDownUpRefresh: function () {
    //     var that = this;
    //     mui.init({
    //         pullRefresh: {
    //             container: "#refreshContainer",
    //             down: {
    //                 //下拉刷新的回调函数       
    //                 callback: function() {
    //                     // 1. 为了模拟延迟写一个定时器
    //                     setTimeout(function() {
    //                         // 2. 请求数据 使用封装ajax
    //                         that. getProduct(function(data) {
    //                             // 3. 渲染页面
    //                             var html = template('cartProductTpl', data);
    //                             $('.cart-list').html(html);
    //                             // 4. 结束下拉刷新  注意官方结束代码有问题 改成 endPulldownToRefresh
    //                             mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
    //                             // 5. 结束了下拉刷新后 要重置上拉加载的效果
    //                             mui('#refreshContainer').pullRefresh().refresh(true);
    //                         });
    //                     }, 2000);
    //                 }
    //             },
    //             up: {
    //                 //上拉加载的回调函数       
    //                 callback: function() {
    //                     // 1. 为了模拟延迟写一个定时器
    //                     setTimeout(function() {
    //                         // 上拉请求数据之前 让page ++
    //                         that.page++;
    //                         // 2. 请求数据
    //                         that.getAjax(function(data) {
    //                             // 3. 判断数据数组是否有长度 有就渲染
    //                             if (data.data.length > 0) {
    //                                 var html = template('cartProductTpl', data);
    //                                 // 4. 上拉追加不是替换
    //                                 $('.cart-list').append(html);
    //                                 // 5. 结束上拉加载 注意官方结束代码有问题 改成 endPullupToRefresh
    //                                 mui('#refreshContainer').pullRefresh().endPullupToRefresh();
    //                             } else {
    //                                 // 6. 没有数据了 结束上拉加载 并且提示没有数据库
    //                                 mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
    //                             }
    //                         });
    //                     }, 2000);
    //                 }
    //             }
    //         }
    //     });
    // }
};






