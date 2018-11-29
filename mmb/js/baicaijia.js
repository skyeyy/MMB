$(function () {
    var mmb = new Mmb();
    mmb.getMenu();
    mmb.getProduct();
    mmb.getAjax(0);
    mmb.getBtn();
})

var Mmb = function () {}
Mmb.prototype = {
    //发动请求,生成菜单
    getMenu: function () {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getbaicaijiatitle',
            success: function (result) {
                console.log(result);
                var html = template('productMenu', result);
                $('#header .nav ul').html(html);
            }
        })
    },

    //发送请求,生成商品详情
    getProduct: function () {
        var that = this;
        //商品标题的点击事件  li标签动态生成需要事件委托
        $('.nav ul').on('tap', 'li', function () {
            var Id = $(this).data('id');
            console.log(Id);
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
                console.log(result);
                var html = template('peoductList', result);
                $('#main ul').html(html);
            }
        })

    }
}