/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 表单验证
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var formVerify = formVerify || {};

(function(){
	var v = formVerify;
	v.tips = $('.tips');
	v.tipsError = '';
	v.tipsSucceed = '';
	v.checkEmpty = function(input){
		var dom = $(input);
		v.tips = dom.nextAll('.tips_'+dom.attr('id'));
		if(dom.val() == ''){
			v.setError(dom.attr('title') + '不能为空');
		}else{
			v.emptyError(input);
		}
	};

	v.checkNumber = function(input){
		var reg = '';
		if(reg){
			v.setTips('不是数字格式',input);
		}else{
			v.emptyTips(input);
		}
	};

	v.setError = function(text,input){
		if(input){
			var dom = $(input);
			v.tips = dom.nextAll('.tips_'+dom.attr('id'));	
		}
		v.tips.addClass('tips_error');
		v.tips.text(text);
	};

	v.emptyError = function(input){
		if(input){
			var dom = $(input);
			v.tips = dom.nextAll('.tips_'+dom.attr('id'));	
		}
		
		v.tips.removeClass('tips_error');
		v.tips.text('');
	};

})();


xes.formVerify = formVerify;