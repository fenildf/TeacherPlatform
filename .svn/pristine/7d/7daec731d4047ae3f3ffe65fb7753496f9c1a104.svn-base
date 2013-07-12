/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 学习状体数据
 * data.study.status.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:ui/xes.ui.calendar.min.js///

///import:xes.form.js///

///import:xes.search.js///

///import:xes.pages.js///

///import:xes.form.verify.js///

/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function () {
	// $("#startDate").calendar();
	$("#dateTimes").calendar();

	var btns = $('#title,#content,#dateTimes');
	btns.each(function(){
		var _t = $(this).attr('id'),
			_tips = $(this).nextAll('.tips_'+_t);
		if(_tips.length == 0){
			$(this).after('<span class="tips tips_'+_t + '"></span>');
		}
		
	});
	btns.blur(function(){
		xes.formVerify.checkEmpty(this);
	});

	$('.btn_cancel').click(function(){
		closeActiveTab();
	});
});


//提交时检测表单
function checkMessageForm(){
	var inputs = $('#title,#content,#dateTimes');
	inputs.each(function(){
		xes.formVerify.checkEmpty(this);
	});

	if($('.tips_error').length > 0){
		return false;
	}else{
		return true;
	}
}

