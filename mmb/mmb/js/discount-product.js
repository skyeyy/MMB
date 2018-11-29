$(function () {

    var mmb = new Mmb();
    mmb.add();
    mmb.comment();
})

var Mmb = function () {

}
Mmb.prototype = {
    id: getQueryString('productid'),
    // 渲染页面
    add: function () {
        var that = this;
        // 接受传递过来的id值
        // 发送ajax请求
        $.ajax({
            url: 'http://localhost:9090/api/getdiscountproduct',
            data: {
                productid: that.id
            },
            success: function (obj) {
                var html = template('maintpl', obj);
                $('#main').html(html);

                var htmltext = JSON.parse(localStorage.getItem('comment'));
                for (var key in htmltext) {

                    if (key == that.id) {
                        if (Array.isArray(htmltext[key])) {
                            for (var i = 0; i < htmltext[key].length; i++) {
                                var li = document.createElement('li');
                                li.style.marginBottom = '0.1rem';
                                li.innerHTML = "匿名张三评论: " + htmltext[key][i];
                                $('.list ul').append(li);
                            }
                        } else {
                            var li = document.createElement('li');
                            li.style.marginBottom = '0.1rem';
                            li.innerHTML = "匿名张三评论: " + htmltext[key];
                            $('.list ul').html(li);
                        }
                    }
                }
            }
        })
    },
    // 发送评论的
    comment: function () {
        var that = this;
        $('#main').on('tap', '.tjdp', function () {
            var text = $('#ctl00_ContentBody_txt_nr').val();
            if (!text.trim()) {
                mui.alert('请输入评论的内容', '温馨提示', '确定');
                return false;
            }
            if (!localStorage.comment) {
                var obj = {};
            } else {
                var obj = JSON.parse(localStorage.getItem('comment'));
            }
            // 创建对象
            // 获取存在的第一条数据的值
            var one = obj[that.id];
            if (that.id in obj) {
                if (Array.isArray(obj[that.id])) {
                    obj[that.id].push(text);
                } else {
                    obj[that.id] = [one];
                    obj[that.id].push(text);
                }

            } else {
                obj[that.id] = text;

            }
            localStorage.setItem('comment', JSON.stringify(obj));
            that.add();
        })
    }
}
//别人使用正则写的获取url地址栏参数的方法
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
        // return unescape(r[2]);
        return decodeURI(r[2]);
    }
    return null;
}