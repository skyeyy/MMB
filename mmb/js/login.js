$(function(){
    var mmb = new MMB();
    mmb.doLogin();
    mmb.doRegister();
});

class MMB{
    constructor(){
    };
    doLogin(){
        $('.btn-login').on('tap',function(){
            var check = true;
            mui(".mui-input-group input").each(function() {
                //若当前input为空，则alert提醒 
                if(!this.value || this.value.trim() == "") {
                    var label = this.previousElementSibling;
                    mui.alert(label.innerText + "不允许为空");
                    check = false;
                    return false;
                }
                }); //校验通过，继续执行业务逻辑 
                if(check){
                    var username = $('.username').val();
                    var password = $('.username').val();
                    var historyData = localStorage.getItem('historyData');
                    historyData = JSON.parse(historyData);
                    var isZai = false;
                    var index = 0;
                    for(var i = 0 ; i < historyData.length; i++ ){
                        if(historyData[i][username]){
                            isZai = true;
                            index = i;
                        }
                    };
                    if(isZai) {
                        if(historyData[index][username] == password){
                            location = "index.html";
                        }else {
                            mui.toast( "账号或者密码错误!请重新输入");
                            $('.username').val();
                            $('.username').val();
                        }
                    }
      
                }
        });
    }
    doRegister(){
        $('.doRegister').on('tap',function(){
            location="register.html";
        })
    }
}