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

/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function () {
	// $("#startDate").calendar();
	$("#endDate").calendar();
	setTimeout(function(){
		var a = $('#courseType').val();
		if(a==649){
			$('#termId').show();
		}else{
			$('#termId').hide();
		}
	},100);
	
	$('#courseType').change(function(){
		if($(this).val()==649){
			$('#termId').show();
		}else{
			$('#termId').hide();
			$('#termId').val(0);
		}
	});
});
