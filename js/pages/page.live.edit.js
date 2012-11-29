/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 直播
 * import.live.edit.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:xes.live.js///

///import:ui/xes.ui.calendar.js///

///import:xes.ajax.js///

///import:xes.form.js///

/* =-=-=-=-=-=-=-=-=-=-=-= live_edit.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function () {
	//直播状态：新建/编辑
	var _date = $('#liveDate').val();
	var TYPE = (_date!='') ? true : false;
	$('#liveTime').show();
	$('#liveDate').click(function(){
		setTimeout(function(){
			xes.iframe.setHeight();
		},500);
	});

	
	if(_date!=''){
		xes.liveTime.createTimeList(_date,TYPE);
	}
	
	$("#liveDate").calendar({callback:function(){
		var date = $('#liveDate').val();

		//程序调用
		
		xes.liveTime.createTimeList(date,TYPE);

		//本地调试
		// var d = xes.liveTime.getJson(date);
		// xes.liveTime.create(d);
	}});
	$('#liveTimeList li.optional').die('click').live('click',function(){

			var _time = $(this).attr('time');
			xes.liveTime.open(_time);
	});
});





