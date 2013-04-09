/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 试卷列表
 * student.leach.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:ui/xes.ui.calendar.min.js///

///import:widget/jquery.cookie.js///

///import:xes.form.js///

///import:xes.pages.js///

///import:xes.img.js///

/* =-=-=-=-=-=-=-=-=-=-=-= test_paper.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function () {
	$("#startDate").calendar();
	$("#endDate").calendar();
	$('.contentData tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});
});

