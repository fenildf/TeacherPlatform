/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * import.course.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:widget/jquery.cookie.js///

///import:ui/xes.ui.tips.js///

///import:xes.ajax.js///

///import:xes.form.js///

///import:xes.search.js///

///import:xes.pages.js///

///import:ui/xes.ui.dialog.js///

///import:ui/xes.ui.calendar.js///

/* =-=-=-=-=-=-=-=-=-=-=-= course_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

function moduleWin(id,url){
	var result = window.showModalDialog(url,'','dialogLeft:300px;dialogTop:360px;dialogWidth:930px;DialogHeight=430px;status:no;resizable:1;');
	// $('#'+id).attr('value',result);
} 
// function addChapter(url){
// 	var result = window.showModalDialog(url,'','dialogLeft:300px;dialogTop:200px;dialogWidth:260px;DialogHeight=230px;status:no;resizable:1;');
// 	// $('#'+id).attr('value',result);
// }
// function viewChapter(url){
// 	var result = window.showModalDialog(url,'','dialogLeft:300px;dialogTop:200px;dialogWidth:800px;DialogHeight=400px;status:no;resizable:1;');
// 	// $('#'+id).attr('value',result);
// }
$(function(){
	$('.grid_item tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});
	$("#dateTime").calendar();
});

