/* -------------------- xes.live.js --------------------- */

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
	l.getJson = function(dd, fn, tp){
		var _data=[{times:"0:00",status:"optional",teacher:""},{times:"0:30",status:"optional",teacher:""},{times:"1:00",status:"optional",teacher:""},{times:"1:30",status:"optional",teacher:""},{times:"2:00",status:"optional",teacher:""},{times:"2:30",status:"optional",teacher:""},{times:"3:00",status:"optional",teacher:""},{times:"3:30",status:"optional",teacher:""},{times:"4:00",status:"selected",teacher:"许强"},{times:"4:30",status:"selected",teacher:"许强"},{times:"5:00",status:"optional",teacher:""},{times:"5:30",status:"optional",teacher:""},{times:"6:00",status:"optional",teacher:""},{times:"6:30",status:"optional",teacher:""},{times:"7:00",status:"selected",teacher:"许强"},{times:"7:30",status:"selected",teacher:"许强"},{times:"8:00",status:"selected",teacher:"许强"},{times:"8:30",status:"selected",teacher:"许强"},{times:"9:00",status:"selected",teacher:"许强"},{times:"9:30",status:"optional",teacher:""},{times:"10:00",status:"optional",teacher:""},{times:"10:30",status:"optional",teacher:""},{times:"11:00",status:"selected",teacher:"许强"},{times:"11:30",status:"selected",teacher:"许强"},{times:"12:00",status:"optional",teacher:""},{times:"12:30",status:"selected",teacher:"许强"},{times:"13:00",status:"optional",teacher:""},{times:"13:30",status:"optional",teacher:""},{times:"14:00",status:"optional",teacher:""},{times:"14:30",status:"selected",teacher:"许强"},{times:"15:00",status:"optional",teacher:""},{times:"15:30",status:"selected",teacher:"许强"},{times:"16:00",status:"selected",teacher:"许强"},{times:"16:30",status:"selected",teacher:"许强"},{times:"17:00",status:"optional",teacher:""},{times:"17:30",status:"optional",teacher:""},{times:"18:00",status:"optional",teacher:""},{times:"18:30",status:"selected",teacher:"许强"},{times:"19:00",status:"selected",teacher:"许强"},{times:"19:30",status:"selected",teacher:"许强"},{times:"20:00",status:"selected",teacher:"许强"},{times:"20:30",status:"optional",teacher:""},{times:"21:00",status:"selected",teacher:"许强"},{times:"21:30",status:"selected",teacher:"许强"},{times:"22:00",status:"selected",teacher:"许强"},{times:"22:30",status:"optional",teacher:""},{times:"23:00",status:"optional",teacher:""},{times:"23:30",status:"selected",teacher:"许强"}];

		//本地调试
		// return _data;
		
		//程序调用
		var _oldtime = $('#oldDate').val();
		var _courseID = $('#courseId').val();
		var url = tp ? dd+'/'+_courseID : dd;
	 	xes.post('/liveCourses/ajaxLiveListByDate/'+ url, {}, function(result){
	 		if(fn){
	 			fn(result);
	 		}else{
				if(result.sign == 1){
					return result.msg;
				}else{
					alert(result.msg);
				}	 			
	 		}
		});
	};
	l.box = $('#liveTime');
	l.list = $('#liveTimeList');
	l.win = $('#liveTimeWin');
	l.btn = $('#liveTimeButton .btn');
	l.startInput = $('#liveTimeStartInput');
	l.endInput = $('#liveTimeEndInput');

	//处理日期，将后端传过来的时间区间比配成现有格式
	l.date = function(data){
		var d = 60*60*24;

	};

	l.create = function(d){
		var _d = d || l.getJson();
		var html='';
		$.each(_d, function(n,m){
			// var status = m.status == 'selected' ? 'unchoose' : 'optional';
			var teacher = m.teacher ? m.teacher : '<a href="javascript:void(0);">预约</a>',
				end = m.times,
				status = m.status == 'myself' ? 'selected' : m.status == 'selected' ? 'unchoose' : 'optional';

			var ends = end.split(':');
			 //把08变为8
			// var hour = ends[0].indexOf('0') == 0 ? ends[0].replace('0','') : ends[0];
			var hour = ends[0];
			var minu = ends[1];
			var hour_number = Number(hour);
			var minu_number = '';
			if(minu == '30'){
				hour_number = hour_number + 1;
				minu_number = ':00';
			}else{
				hour_number = Number(hour);
				minu_number = ':30';
			}
			hour_number = hour_number < 10 ? '0'+hour_number : hour_number;

			// var endtime = ends[1]=='30' ? Number(hour)+1 + ':00' : hour + ':30';
			var endtime = hour_number + minu_number;
			html += '<li time="' + m.times + '" endtime="' + endtime + '" class="' + status + '"><span class="time">' + m.times + '</span><span class="endtime">&nbsp;-- '+ endtime +'</span><span class="name">' + teacher + '</span></li>';	
		});
		$('#liveTime').show();
		l.list.html(html);
	};
	/**
	 * 创建时间列表
	 */
	l.createTimeList = function(day,tp){
		if(day){
			xes.liveTime.getJson(day,function(d){
				if(d.sign == 1){
					xes.liveTime.create(d.msg);
				}else{
					alert(d.msg);
				}
			},tp);
		}
	};
	l.open = function(t,e){
		l.win.css({
			top : $(window).height() / 2,
			left: $(window).width() / 2 - 214
		}).show();

		l.setSelect(t,e);
		l.btnClick();
	};
	l.btnClick = function(){
		l.btn.die('click').live('click',function(){
			if($(this).hasClass('btn_submit')){
				if($('#liveTimeStartInput').val() == '' && $('#liveTimeEndInput').val() == ''){
					var _val = l.getValue();
					l.setTimeValue(_val.start, _val.end);
				}else{
					if(confirm('是否替换之前的预约时间？')){
						xes.liveTime.empty();
						var _val = l.getValue();
						l.setTimeValue(_val.start, _val.end);
					};
				}

			}else{
				l.close();
			}
		});
	};
	l.setSelect = function(s,e){
		var start = '<option value="' + s + '">' + s + '</option>';
		var end ='';
		var _a = l.list.find('li.optional[time="'+s+'"]');
		var _e = _a.nextAll('li.unchoose').eq(0);
		_e = _e.length > 0 ? _e.attr('time') : false;
		l.each(s,_e,function(i, t){
			var _t = t.attr('time'),
				_end = t.attr('endtime');
			end += '<option value="' + _end + '">' + _end + '</option>';	
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
		var _tmp = l.list.find('li.optional[time="'+e+'"]').prevAll('.optional').eq(0);

		//根据结束时间，获取相关的节点
		var _endNode = l.list.find('li[endtime="'+e+'"]');

		//判断结束时间点是选中状态还是可选状态，如果是已经选中状态，则向上查询紧邻的上一个未选状态
		if(_endNode.attr('class') != 'optional'){
			_endNode = _endNode.prevAll('li.optional');
		}
		//获取可选结束时间的索引值
		var _b = _list.index(_endNode[0]);
		// var _b = _list.index(l.list.find('li.optional[endtime="'+e+'"]')[0]);
		
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
			t.removeClass('optional').addClass('selected').find('.name').text('已预约');
		});
		l.startInput.val(s);
		l.endInput.val(e);
		
		l.close();
	};

	l.setSelectValue = function(){};
	l.empty = function(){
		$('#liveTimeStartInput,#liveTimeEndInput').val('');
		l.list.find('li.selected').each(function(){
			$(this).removeClass('selected').addClass('optional');
			$(this).find('.name').html('<a href="javascript:void(0);">预约</a>');
		});
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