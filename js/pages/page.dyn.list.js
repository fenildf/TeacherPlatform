/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/* 直播列表
 * live.list.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

/* //import:ui/xes.ui.select.js// */

///import:xes.form.js///

///import:xes.search.js///

///import:xes.pages.js///

///import:xes.date.js///

///import:ui/xes.ui.calendar.js///

///import:widget/jquery.cookie.js///

/* =-=-=-=-=-=-=-=-=-=-=-= dyn_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

// function liveCancel(liveId){
// 	alert('已取消');
// }

$(function(){
	$("#startDate").calendar();
	$("#endDate").calendar();
	$('.grid_item tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});
/* =-=-=-=-=-=-=-=-=-=-=-= 评论框弹出=-=-=-=-=-=-=-=-=-=-=-=-= */
	xes.date.clock.start($('#serverTime'));
	
});


