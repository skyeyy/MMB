$(function(){

    var id = location.search.split('?productid=')[1];
    console.log(id);
    //发送请求 获取商品信息
    $.ajax({

        url : 'http://localhost:9090/api/getmoneyctrlproduct',
        data : {productid : id},
        success : function(data){

            console.log(data);
            var html = template('detailsTpl',data);
            $('#main').html(html)
            

        }

    })

})