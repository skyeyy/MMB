$(function () {

    var slowlybuy = new Moneyctrl();
    slowlybuy.queryGoods();
    // slowlybuy.getOption();
    slowlybuy.previousPage();
    slowlybuy.nextPage();
    slowlybuy.skipPage();
})

function Moneyctrl() {



}

Moneyctrl.prototype = {

    page: 1,
    pageSize: 10,
    totalPage: 1,


    //查询商品信息
    queryGoods: function () {
        var that = this;
        that.publicAjax(function(data){

            console.log(data);
            
            var html = template('goodslistTpl', data);
            $('.goods-list').html(html);
            that.totalPage = Math.ceil(data.totalCount / data.pagesize);
            for (var i = 0; i < that.totalPage; i++) {

                var option = document.createElement('option')
                option.value = i + 1;
                option.innerHTML = ((i + 1) + '/' + that.totalPage);
                $('#page-list').append(option);

            }

        });
        
    },

    // //生成option
    // getOption: function () {
    //     var that = this;
    //     $.ajax({

    //         url: 'http://localhost:9090/api/getmoneyctrl',
    //         success: function (data) {

    //             that.totalPage = Math.ceil(data.totalCount / data.pagesize);
    //             // console.log(that.totalPage);
    //             for (var i = 0; i < that.totalPage; i++) {
    //                 var option = document.createElement('option')
    //                 // console.log(option);
    //                 option.value = i;
    //                 option.innerHTML = ((i + 1) + '/' + that.totalPage);
    //                 $('#page-list').append(option);
    //             }
    //             // console.log($('.page-list'));


    //         }

    //     })


    // },

    //点击上一页
    previousPage: function () {
        var that = this;
        $('.btn-previous').on('tap', function () {
            that.page--;
            console.log(that.page);
            
            // console.log(this);
            if (that.page == 0) {

                that.page = that.totalPage;

            }
            that.publicAjax(function(data){

                var html = template('goodslistTpl', data);

                $('.goods-list').html(html);

                document.documentElement.scrollTop = 0;
                // var lis = $('#page-list option');

                // for(var i = 0; i <= lis.length; i++){

                //     if(i + 1 ==that.page) {

                //         $(lis[i]).attr('selected','');

                //     }else {

                //         $(lis[i]).removeAttr('selected');
                //     }
                // }

                $('#page-list').val(that.page);

            })


        })

    },

    //点击下一页
    nextPage: function () {

        var that = this;
        
        $('.btn-next').on('tap', function () {

            that.page++;
            console.log(that.page);
            
            // console.log(that.totalPage);
            if (that.page > that.totalPage) {

                that.page = 1;
            }
            
            that.publicAjax(function(data){
                var html = template('goodslistTpl', data);
                $('.goods-list').html(html);
                document.documentElement.scrollTop = 0;
                // var lis = $('#page-list option');

                // for(var i = 0; i< lis.length; i++){

                //     if((i + 1) == that.page) {

                //         $(lis[i]).attr('selected','');

                //     }else {

                //         $(lis[i]).removeAttr('selected');

                //     }
                    
                // }

                $('#page-list').val(that.page);
            })



        })

    },

    //点击option的跳转事件

    skipPage : function(){
        var that = this;
        $('#page-list').on('change',function(){

            var pageNum = $(this).val();
            console.log(pageNum);
            

            that.page = pageNum;

            that.publicAjax(function(data){

                var html = template('goodslistTpl', data);
                $('.goods-list').html(html);
                
                $('#page-list').val(that.page);
            })
            
            

        })


    },

    //公用的ajax样式

    publicAjax : function (callback) {
        var that = this;
        $.ajax({

            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: that.page - 1
            },
            success: function (data) {

                callback(data);
            }

        })

    }


}