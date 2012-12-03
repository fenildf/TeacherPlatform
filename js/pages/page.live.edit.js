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

///import:ui/xes.ui.calendar.min.js///

///import:xes.ajax.js///

///import:xes.form.js///

///import:xes.date.js///

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
		//创建直播时：选择时间的时候清空已选时间段的隐藏表单值
		var courseid = $('#courseId');
		if(courseid.length == 0){
			$('#liveTimeStartInput, #liveTimeEndInput').val('');
		}
		//程序调用
		
		xes.liveTime.createTimeList(date,TYPE);

		//设置星期
		var getweek = xes.date.getWeek(date);
		$('#time_week').text('时间/'+ getweek);
	}});

	$('#liveTimeList li.optional').die('click').live('click',function(){
			var _time = $(this).attr('time');
			xes.liveTime.open(_time);

			//设置日期
			var _date = $('#liveDate').val();
			var _week = xes.date.getWeek(_date);
			$('#liveDateStart').text(_date+'('+_week+')');
			$('#liveDateEnd').text(_date+'('+_week+')');
			//设置老师名称
			var par = window.parent;
			if(par){
				var teacher = par.getTeacherName();
				$('#teacherName').text(teacher);
			}
	});
});





