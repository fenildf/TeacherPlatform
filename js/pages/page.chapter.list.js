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

/* //import:ui/xes.ui.select.js// */

///import:xes.ajax.js///

///import:xes.form.js///

///import:xes.search.js///

///import:xes.pages.js///

///import:ui/xes.ui.dialog.js///

/* =-=-=-=-=-=-=-=-=-=-=-= chapter_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function(){
	$('.grid_item tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});
	if($('input:text').length > 0){
		xes.form.defaultValue();
	}
});
