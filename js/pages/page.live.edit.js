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

///import:xes.date.js///

///import:xes.form.verify.js///

/* =-=-=-=-=-=-=-=-=-=-=-= live_edit.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function () {
	//直播状态：新建/编辑
	var _date = $('#liveDate').val();
	var room = $('#liveChannel').val();
	console.log('room:'+room);
	var TYPE = (_date!='') ? true : false;
	$('#liveTime').show();
	$('#liveDate').click(function(){
		setTimeout(function(){
			xes.iframe.setHeight();
		},500);
	});

	if(_date!=''){
		xes.liveTime.createTimeList(_date,TYPE,room);
		$('#room_'+room).addClass('current').siblings('a').removeClass('current');
		var getweek = xes.date.getWeek(_date);
		$('#time_week span').text('时间/'+ getweek);
	}

	$('#time_week a').click(function(){
		var _date = $('#liveDate').val();
		var _room = $(this).attr('id');
		_room = _room.replace('room_','');
		if(_date !=''){
			xes.liveTime.createTimeList(_date,TYPE,_room);
			$(this).addClass('current').siblings('a').removeClass('current');
		}else{
			alert('请先选择预约日期');
		}
	});
	
	
	$("#liveDate").calendar({callback:function(){
		var date = $('#liveDate').val();
		var _room = $('#liveChannel').val();
		//创建直播时：选择时间的时候清空已选时间段的隐藏表单值
		var courseid = $('#courseId');
		if(courseid.length == 0){
			$('#liveTimeStartInput, #liveTimeEndInput').val('');
		}
		//程序调用
		
		xes.liveTime.createTimeList(date,TYPE,_room);
		$('#room_'+room).addClass('current').siblings('a').removeClass('current');

		//设置星期
		var getweek = xes.date.getWeek(date);
		$('#time_week span').text('时间/'+ getweek);
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

	var btns = $('#courseName,#gradeId,#subjectId,#description,#liveDate,#resourcePath');
	btns.blur(function(){
		if($(this).attr('id') == 'courseName'){
			checkLiveTitle();
		}else{
			xes.formVerify.checkEmpty(this);
		}
	});
});


function checkLiveForm(){
	var inputs = $('#courseName,#gradeId,#subjectId,#description,#liveDate,#resourcePath');
	inputs.each(function(){
		if(this.id == 'courseName'){
			checkLiveTitle();
		}else{
			xes.formVerify.checkEmpty(this);
		}
	});

	if($('.tips_error').length > 0){
		return false;
	}else{
		return true;
	}
}

//检查直播名称
function checkLiveTitle(){
	var input = $('#courseName');
	var val = input.val();
	if(val == ''){
		// return '不能为空';
		xes.formVerify.setError('直播名称不能为空',input[0]);
	}else{
		if(val.length < 4 || val.length > 20){
			// return '标题字数只能在4到20个字之间';
			xes.formVerify.setError('标题字数只能在4到20个字之间',input[0]);
		}else{
			// return true;
			xes.formVerify.emptyError(input[0]);
		}
	}
}
