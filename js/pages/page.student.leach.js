/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 学员筛选
 * student.leach.js
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

/* =-=-=-=-=-=-=-=-=-=-=-= student_leach.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function () {
	$("#startDate").calendar();
	$("#endDate").calendar();

	// $('#startRate').calendar();
	// $('#endRate').calendar();

	$('.contentData tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});

	// if($('input:text.input_text').length > 0){
	// 	xes.form.defaultValue();
	// }
});
