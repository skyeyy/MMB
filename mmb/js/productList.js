$(function () {
    var mmb = new MMB();
    mmb.queryNav();
    mmb.queryProduct();
    mmb.filtrate();
    mmb.categoryul();
    mmb.getProductList();
    mmb.getAClick();
})

var MMB = function () {

}

MMB.prototype = {
    categoryid: 1,
    pageid: 1,
    categorynavid: 1,
    queryNav: function () { // 获取分类标题
        var that = this;
        that.categorynavid = that.getQueryString('categoryid');
        that.categorynavid = that.categorynavid ? that.categorynavid : 1;
        $.ajax({
            url: "http://localhost:9090/api/getcategorybyid",
            data: {
                categoryid: that.categorynavid
            },
            success: function (data) {
                that.title = that.getQueryString('title');
                that.title = that.title ? that.title : '全部分类';
                that.categoryname = data.result[0].category;
                $('#categorytitle').html(that.title);
                $('#category').attr('href', 'productList.html?title='+that.title+'&categoryid=' + data.result[0].categoryId).html(that.categoryname);
            }
        });
    },
    queryProduct: function () { // 商品渲染
        var that = this;
        that.categoryid = that.getQueryString('categoryid');
        that.categoryid = that.categoryid ? that.categoryid : 1;
        $.ajax({
            url: "http://localhost:9090/api/getproductlist",
            data: {
                categoryid: that.categoryid,
                pageid: that.pageid,
            },
            success: function (data) {
                data.title = that.title;
                data.categoryname = that.categoryname;
                mui('.mui-content.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
                var html = template('productListTpl', data);
                $('.product-List').html(html);
                that.pageCount = Math.ceil(data.totalCount / data.pagesize);
                that.initPage();
                // $('.mui-scroll').attr('style', '');
                
            }
        });
    },
    getQueryString: function (name) { // 获取地址栏参数
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
            // return unescape(r[2]);
            return decodeURI(r[2]);
        }
        return null;
    },
    initPage: function () { // 分页
        var that = this;
        var html = "<button type='button' id='pagePre'>上一页</button><span><input id='setPage' type='text' value='" + this.pageid + "'/> / " + this.pageCount + "</span><button type='button' id='pageNext'>下一页</button>";

        $('#page').html(html).css({
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        });

        $('#setPage').css({
            width: '.35rem',
            height: '.3rem',
            margin: 0,
            padding: 0,
            textAlign: 'center'
        });
        if (that.pageid <= 1) {
            $('#pagePre').attr('disabled', 'disabled')
        }
        if (that.pageid >= that.pageCount) {
            $('#pageNext').attr('disabled', 'disabled')
        }
        $('#pagePre').on('tap', function () {
            that.pageid--;
            that.queryProduct();
        });
        $('#pageNext').on('tap', function () {
            that.pageid++;
            that.queryProduct();
        });
        $('#setPage').on('focus', function () {
            $(window).on('tap', function (e) {
                if (e.target.nodeName != 'INPUT') {
                    var val = +$('#setPage').val();
                    if (!val || typeof (val) != 'number' || val < 1 || val > that.pageCount) {
                        mui.alert('请输入合法的页码');
                        return;
                    }
                    that.pageid = val;
                    that.queryProduct();
                }

            });
        });
    },
    filtrate: function () { // 滚动插件,滑动插件初始化
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
        $('.filtrate').on('tap', function () {
            mui('.mui-off-canvas-wrap').offCanvas().show();
        });
    },
    categoryul: function () { // 左滑导航栏渲染
        $.ajax({
            url: "http://localhost:9090/api/getcategorytitle",
            success: function (data) {


                var html = '';
                for (var i = 0; i < data.result.length; i++) {
                    html += "<button type='button' class='getCategorytitle' data-titleid='" + data.result[i].titleId + "'>" + data.result[i].title + "</button>";
                }
                $('.categoryTitleul').html(html);
                $('.categoryTitleul').on('tap', '.getCategorytitle', function () {
                    var titleId = $(this).data('titleid');
                    $.ajax({
                        url: "http://localhost:9090/api/getcategory",
                        data: {
                            titleid: titleId
                        },
                        success: function (data) {
                            console.log(data);
                            html = '';
                            for (var i = 0; i < data.result.length; i++) {
                                html += "<button type='button' class='getCategory' data-categoryid='" + data.result[i].categoryId + "'>" + data.result[i].category + "</button>";
                            }
                            $('.categoryul').html(html);

                        }
                    });

                });
            }
        })
    },
    getProductList: function () { // 筛选(左滑导航栏)事件
        var that = this;
        var isCategorytitle = false;
        var isCategoryid = false;
        $('#main').on('tap', function (e) {
            if (e.target && e.target.nodeName != 'BUTTON') {
                if (mui('.mui-off-canvas-wrap').offCanvas().isShown()) {
                    mui('.mui-off-canvas-wrap').offCanvas().close();
                }
            }
        });
        $('.categoryTitleul').on('tap', '.getCategorytitle', function () {
            isCategorytitle = true;
            $(this).css("backgroundColor", '#ff6c00').siblings().css("background", 'white');
            that.Categorytitle = $(this).data('titleid');
            that.title = $(this).html().replace(/\s/g, '');
        });
        $('.categoryul').on('tap', '.getCategory', function () {
            isCategoryid = true;
            $(this).css("backgroundColor", '#ff6c00').siblings().css("background", 'white');
            that.categoryid = +$(this).data('categoryid');
        });
        $('#getProductList').on('tap', function () {
            if (!isCategorytitle || !isCategoryid) {
                alert('查询条件不足');
                return;
            }
            mui('.mui-off-canvas-wrap').offCanvas().close();
            location = "ProductList.html?title=" + that.title + "&categoryid=" + that.categoryid;
        });
    },
    getAClick: function () { // 获取被mui阻止的a跳转
        mui(document).on('tap', 'a', function () {
            var a = document.createElement('a');
            a = this.cloneNode(true);
            a.click();
        })
    }
}