$(function () {
    $('.register').on('tap', function () {
        var check = true;
        mui(".mui-input-group input").each(function () {
            //若当前input为空，则alert提醒 
            if (!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑 
        if (check) {
            var num = $('.tel').val();
            if (!(/^1[34578]\d{9}$/.test(num))) {
                mui.alert("请输入正确的手机号", "温馨提示", "重新输入", function () {
                    $('.tel').val("");
                });
                return false;
            };
            var email = $('.email').val();
            if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email))) {
                mui.alert("请输入合法的邮箱", "温馨提示", "重新输入", function () {
                    $('.email').val("");
                });
                return false;
            };

            var username = $('.username').val();
            console.log(username);

            var password = $('.password').val();
            historyData = localStorage.getItem("historyData");
            if (historyData) {
                historyData = JSON.parse(historyData);
            } else {
                historyData = [];
            }
            if (historyData.username) {
                mui.alert("用户名已被注册", "温馨提示", "重新输入", function () {
                    $('.username').val("");
                });
            } else {
                //   return false;
                var obj = {};
                obj[username] = password;
                historyData.push(obj);
                localStorage.setItem("historyData", JSON.stringify(historyData))
                mui.alert("注册成功!", "温馨提示", "去登录", function () {
                    location = "login.html";
                });
            }



        }
    });
})