$(function () {

    var local = 'http://localhost:9090';

    $.ajax({
        url: local + '/api/getsitenav',
        success: function (result) {
            console.log(result);

            var html = template('getsitenavTpl', result);
            $('.shop-nav').html(html);
        }
    });

});


