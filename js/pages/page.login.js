/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * login
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:widget/jquery.validate.pack.js///


/* =-=-=-=-=-=-=-=-=-=-=-= login.html =-=-=-=-=-=-=-=-=-=-=-=-= */

// 校验登录表单
function checkLoginForm() {

	var _tipsbox = $('.err_tips_infor');

	if($('#username').val() == '') {
		_tipsbox.html('用户名不能为空!');
		emptyTips();
		return false;
	}
	
	if($('#password').val() == '') {
		_tipsbox.html('密码不能为空!');
		emptyTips();
		return false;
	}
	
	if($('#verificationCode').val() == '') {
		_tipsbox.html('验证码不能为空!');
		emptyTips();
		return false;
	}
	
	$.ajax({
		async: false,
		type: "POST",
		url: "/users/getVerificationCode",
		data: "verificationCode=" + $("#verificationCode").val(),
		dataType: "json",
		timeout: 7000,
		success: function(result) {	
			if (result.sign !== true) {
				_tipsbox.html('验证码错误,请重新填写!');
				emptyTips();
				changeVerificationImg('verificationImg');
				return false;
			}
		},
		error: function() {
			//alert('数据读取错误,请重试..');
			return false;
		}
	});

	$('#userLoginForm').submit();
};

function emptyTips(){
	setTimeout("$('.err_tips_infor').html('')", 5000);
}

// 更新验证码图片
function changeVerificationImg(imgId) {
	var newVerificationImg = '/verifications/show?' + generateMixed(12);
	$('img[id="' + imgId + '"]').attr('src', newVerificationImg);
};


// 生成随机字符串
function generateMixed(n) {
	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
};
			