/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 创建试题
 * project.create.js
 * @update : 2013-1-30
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:xes.form.js///

/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function () {
	// $("#startDate").calendar();
	$('#paper_type').change(function(){
		var _txt = $('#paper_type option:selected').text();
		if(this.value==2 || _txt == '考卷'){
			$('.paper_type_box').show();
		}else{
			$('.paper_type_box').hide();
		}
	});

	$('.questions_type_button').change(function(){
		var _box = $('.questions_type');
		_box.hide();
		if(this.value == 1){
			$('#questions_type_checkbox').show();
		}else{
			$('#questions_type_input').show();
		}
	});
});
