/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 数据查看
 * data.view.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:xes.form.js///

///import:xes.search.js///

///import:xes.pages.js///

/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function(){
	$('.contentData tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});
});