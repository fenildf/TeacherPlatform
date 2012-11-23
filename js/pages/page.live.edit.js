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

///import:xes.iframe.js

///import:xes.live.js



///import:ui/xes.ui.calendar.min.js

/* =-=-=-=-=-=-=-=-=-=-=-= live_edit.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function () {
	$("#liveDate").calendar({callback:function(){
		var d = xes.liveTime.getJson();
		xes.liveTime.create(d);
	}});
	$('#liveTimeList li.optional').die('click').live('click',function(){
		// if($(this).hasClass('optional')){
			if($('#liveTimeStartInput').val() == '' && $('#liveTimeEndInput').val() == ''){
				var _time = $(this).attr('time');
				xes.liveTime.open(_time);
			}else{
				alert('您已经预约成功，请勿重复预约');
			}
		// }else{
		// 	alert('此时间已被预定，请选择其他时间');
		// }
	});
});





