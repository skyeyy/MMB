$(function(){

    var mmb = new Mmb();
    mmb.add();
    mmb.upDown();
    mmb.event();
})

var Mmb = function(){

}
Mmb.prototype = {
    index:0,
    i:8,
    // 页面渲染功能
    add:function(type){
        var  that = this;
        $.ajax({
            url:'http://localhost:9090/api/getinlanddiscount',
            success:function(obj){
                obj.result =  obj.result.slice(that.index,that.i)
                if (obj.result.length <= 0) {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    // 获取当前主题的高度
                                    // $('body').css('paddingBottom',146)   
                                    // var height = $('#main').height();
                                    // // 计算应该位移的最大高度
                                    // var height = $('.mui-scroll').height()-height;
                                    // $('.mui-scroll').css('transform','translate3d(0px, -'+height+'px, 0px)');
                                    // $('#footer').show();
                                    return false;
                                }else {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                }
                var  html = template('maintpl',obj);
                if(type=='append') {
                    $('#main ul').append(html);
                    // fn(obj);
                }else {
                    $('#main ul').html(html);

                }
            }
         
        })
    },
    // 上下拉加载
    upDown:function(){
        var that = this;

        mui.init({
            pullRefresh : {
              container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                   
                    that.index =0;
                    that.i = 10;
                    setTimeout(function(){
                        that.add();
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        mui('#refreshContainer').pullRefresh().refresh(true);
                    },1000)
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              },
              up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:false,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function(){
                    that.index = that.i;
                    that.i = that.i + 4;
                    setTimeout(function(){
                        that.add('append');
                    },1000)
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              }
            }
          });
    },
    // 点击跳转详情页功能
    event:function(){

        $('#main').on('tap','.event',function(){
            // 获取id
            var id = $(this).data('id');
            location = 'discount-product.html?productid='+id;
        })
    }
}
// mui(document).on('tap', 'a', function() {
//     var a = document.createElement('a');
//     a = this.cloneNode(true);
//     a.click();
// })