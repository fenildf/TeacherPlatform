/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 直播
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var xes = xes || {};

xes.live = xes.live || {};

/**
 * 直播时间
 */
xes.liveTime = xes.liveTime || {};

(function(){
	var l = xes.liveTime;
	l.getJson = function(){
		var _data = [{
			times: '0:00', status: 'optional', teacher: ''
		}, {
			times: '0:30', status: 'optional', teacher: ''
		}, {
			times: '1:00', status: 'optional', teacher: ''
		}, {
			times: '1:30', status: 'optional', teacher: ''
		}, {
			times: '2:00', status: 'optional', teacher: ''
		}, {
			times: '2:30', status: 'optional', teacher: ''
		}, {
			times: '3:00', status: 'optional', teacher: ''
		}, {
			times: '3:30', status: 'optional', teacher: ''
		}, {
			times: '4:00', status: 'selected', teacher: '许强'
		}, {
			times: '4:30', status: 'selected', teacher: '许强'
		}, {
			times: '5:00', status: 'optional', teacher: ''
		}, {
			times: '5:30', status: 'optional', teacher: ''
		}, {
			times: '6:00', status: 'optional', teacher: ''
		}, {
			times: '6:30', status: 'optional', teacher: ''
		}, {
			times: '7:00', status: 'selected', teacher: '许强'
		}, {
			times: '7:30', status: 'selected', teacher: '许强'
		}, {
			times: '8:00', status: 'selected', teacher: '许强'
		}, {
			times: '8:30', status: 'selected', teacher: '许强'
		}, {
			times: '9:00', status: 'selected', teacher: '许强'
		}, {
			times: '9:30', status: 'optional', teacher: ''
		}, {
			times: '10:00', status: 'optional', teacher: ''
		}, {
			times: '10:30', status: 'optional', teacher: ''
		}, {
			times: '11:00', status: 'selected', teacher: '许强'
		}, {
			times: '11:30', status: 'selected', teacher: '许强'
		}, {
			times: '12:00', status: 'optional', teacher: ''
		}, {
			times: '12:30', status: 'selected', teacher: '许强'
		}, {
			times: '13:00', status: 'optional', teacher: ''
		}, {
			times: '13:30', status: 'optional', teacher: ''
		}, {
			times: '14:00', status: 'optional', teacher: ''
		}, {
			times: '14:30', status: 'selected', teacher: '许强'
		}, {
			times: '15:00', status: 'optional', teacher: ''
		}, {
			times: '15:30', status: 'selected', teacher: '许强'
		}, {
			times: '16:00', status: 'selected', teacher: '许强'
		}, {
			times: '16:30', status: 'selected', teacher: '许强'
		}, {
			times: '17:00', status: 'optional', teacher: ''
		}, {
			times: '17:30', status: 'optional', teacher: ''
		}, {
			times: '18:00', status: 'optional', teacher: ''
		}, {
			times: '18:30', status: 'selected', teacher: '许强'
		}, {
			times: '19:00', status: 'selected', teacher: '许强'
		}, {
			times: '19:30', status: 'selected', teacher: '许强'
		}, {
			times: '20:00', status: 'selected', teacher: '许强'
		}, {
			times: '20:30', status: 'optional', teacher: ''
		}, {
			times: '21:00', status: 'selected', teacher: '许强'
		}, {
			times: '21:30', status: 'selected', teacher: '许强'
		}, {
			times: '22:00', status: 'selected', teacher: '许强'
		}, {
			times: '22:30', status: 'optional', teacher: ''
		}, {
			times: '23:00', status: 'optional', teacher: ''
		}, {
			times: '23:30', status: 'selected', teacher: '许强'
		}];
		return _data;
	};

	l.list = $('#liveTimeList');
	l.win = $('#liveTimeWin');
	l.btn = $('#liveTimeButton .btn');
	l.startInput = $('#liveTimeStartInput');
	l.endInput = $('#liveTimeEndInput');


	l.create = function(d){
		var _d = d || l.getJson();
		var html='';
		$.each(_d, function(n,m){
			var status = m.status == 'selected' ? '' : 'optional',
				teacher = m.teacher ? m.teacher : '<a href="javascript:void(0);">预约</a>';
			html += '<li time="' + m.times + '" class="' + status + '"><span class="time">' + m.times + '</span><span class="name">' + teacher + '</span></li>';	
		});
		l.list.html(html);
	};
	l.open = function(t){
		
		l.win.css({
			top : $(window).height() / 2 - 90,
			left: $(window).width() / 2 - 174
		}).show();

		l.setSelect(t)
		l.btnClick();
	};
	l.btnClick = function(){
		l.btn.die('click').live('click',function(){

			if($(this).hasClass('btn_submit')){
				var _val = l.getValue();
				l.setTimeValue(_val.start, _val.end);
			}else{
				l.close();
			}
		});
	};
	l.setSelect = function(s){
		var start = '<option value="' + s + '">' + s + '</option>';
		var end ='';
		l.each(s,false,function(i, t){
			var _t = t.attr('time');
			end += '<option value="' + _t + '">' + _t + '</option>';	
		});

		$('#liveTimeStart').html(start);
		$('#liveTimeEnd').html(end);
	};
	/* 从select中获取值 */
	l.getValue = function(){
		var _s = $('#liveTimeStart').val();
		var _e = $('#liveTimeEnd').val();
		return {start: _s, end: _e};
	};
	/* 时间循环，返回i，即eq(i) 和可预约的当前节点 */
	l.each = function(s,e,fn){
		var _list = l.list.find('li.optional');
		var _a = _list.index(l.list.find('li.optional[time="'+s+'"]')[0]);
		var _b = _list.index(l.list.find('li.optional[time="'+e+'"]')[0]);
		//如果没有结束时间则取列表长度，如果有结束
		var _e = e ? _b + 1 : _list.length;
		for(var i = _a, len = _e; i < len; i++){
			fn(i, _list.eq(i));
		}
	};

	l.setTimeValue = function(s, e){
		var _s = s || l.startTime,
			_e = e || l.endTime;
		l.each(_s, _e, function(i, t){
			// console.log(i + ' | ' + t.attr('time'));
			t.removeClass('optional').addClass('selected').find('.name').text('已预约');
		});
		l.startInput.val(s);
		l.endInput.val(e);
		// l.list.find('li.optional').each(function(i){
		// 	var _time = $(this).attr('time');
		// 	if(_time == s){
		// 		for(var j = i, len = l.list.find('li.optional').length; j < len; j++){
		// 			$(this).addClass('selected');
		// 			if(_time == e){
		// 				return;
		// 			}
		// 		}
	
		// 	}
		// });
		l.close();
	};

	l.submit = function(){
		//ajax
	};
	l.choose = function(){};
	l.close = function(){
		l.win.hide();
	};
	l.position = function(){};
})();