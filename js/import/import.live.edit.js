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

/* =-=-=-=-=-=-=-=-=-=-=-= xes.iframe.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * set iframe height
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */
var xes = xes || {};
xes.iframe = xes.iframe || {};

(function(){
	var f = xes.iframe;
	
	f.getPageHeight = function(){
		var _win = $(window).height(),
			_body = $('body').height();
		return _body;
	};
	f.setHeight = function(){
		var _setHeight = window.parent.setIframeHeight;
		if(_setHeight){
			// setTimeout(function(){
				// _setHeight(f.getPageHeight(), f.getUrl());
			// },100);
			_setHeight();
		}
	};
	f.getUrl = function(){
		var _local = window.location,
			// _pathname = _local.pathname.replace('/','');
			_pathname = _local.pathname;
		return _pathname;
	};
})();
$(function(){

	setTimeout(function(){
		xes.iframe.setHeight();
	},100);
	// if(window.parent){
	// 	//增加backspace按键返回操作
	// 	$('body').keyup(function(e){
	// 		// window.parent.goBack(e);
	// 		// var code = e.keyCode;
	// 		// if(code == 8){
	// 		// 	xes.ui.tabs.backHistory(function(){
	// 		// 		setIframeHeight();
	// 		// 	});
	// 		// }
	// 	});
	// }
	
})


/* =-=-=-=-=-=-=-=-=-=-=-=- 子页面调用父级方法 -=-=-=-=-=-=-=-=-=-=-=-=-= */

/**
 * 创建标签
 * 直接调用父级的openTabs方法，这里只是一个中转函数；
 * 可以直接传入dom对象，dom必须存在url、id、title等属性，且必须有text()内容
 	也可以第一个参数传入url，第二个传入标签标题
 */
var openTab = function(dom, text){
	window.parent.openTabs(arguments);
	// xes.iframe.setHeight();
};

/**
 * 打开标签（表单提交），非链接点击时
 */
var goTab = function(url, title, id, closeSelf){
	if(closeSelf){
		window.parent.getActiveTabs(function(self){
			var closeID = self.attr('id');
			closeID = closeID.replace('tab_','');
			// window.parent.closeActiveTabs(_id);
			window.parent.goTabs(url, title, id, closeID);
		});

		
	}
}
/**
 * 刷新标签
 */
var refreshTab = function(id){
	window.parent.refreshTabs(id);
};

/**
 * 初始化所有带有open_tabs样式的链接为tab方式打开，不带则用默认方式打开
 */
var initTabBtn = function(){
	var _btn = $('.open_tabs');
	_btn.die('click').live('click',function(){
		openTab(this);

		return false;
	});
}();


/* =-=-=-=-=-=-=-=-=-=-=-= ui/xes.ui.tips.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * tips
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var tips = tips || {};

(function(){
	var t = tips;

	t.create = function(tp, content){
		var _html = '<div class="ui_tips tips_' + tp + '"><span>' + content + '</span><a href="javascript:void(0);" class="tips_close">关闭</a></div>';
		if($('.ui_tips').length == 0){
			$('body').append(_html);
		}else{
			$('.ui_tips').attr('class','ui_tips tips_'+tp).find('span').text(content);
		}
		// this.show();
		this.dom = $('.ui_tips');
		this.dom.find('.tips_close').die('click').live('click',function(){
			t.close();
		});
		return this;
	};

	t.show = function(dom){
		var _tips = dom || this.dom;
		_tips.fadeIn();
		return this;
	};
	t.hide = function(dom){
		var _tips = dom || this.dom;
		_tips.fadeOut();
		return this;
	};
	t.close = function(fn){
		if(fn){
			fn(t.dom);
		}
		t.hide();
		return this;
	};

	t.error = function(content){
		this.create('error',content).show();
	};
	t.succeed = function(content){
		this.create('succeed',content).show();
	};
	t.help = function(content){
		this.create('help',content).show();
	};
	t.info = function(content){
		this.create('info',content).show();
	};

})();


/* 注册到UI库 */
(function(xes){
	if(xes.ui){
		xes.ui.add('tips',tips,function(msg){
			// console.log(msg);
			// if(msg === 'ok'){
			// 	xes.ui.tips.init();
			// }
			xes.tips = xes.ui.tips;
		});
	}
})(xes);


/* =-=-=-=-=-=-=-=-=-=-=-= xes.live.js =-=-=-=-=-=-=-=-=-=-=-=-= */
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
	l.getJson = function(dd, fn, tp){
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

		//本地调试
		// return _data;
		
		//程序调用
		var _oldtime = $('#oldDate').val();
		var _courseID = $('#courseId').val();
		// var isSmae = _oldtime == dd ? true : false;
		// console.log(isSmae);
		// var url = tp ? isSmae ? dd+'/myself/'+_oldtime : dd+'/myself' : dd;
		// console.log(url);
		var url = tp ? dd+'/'+_courseID : dd;
		// var url = tp ? dd+'/'+_oldtime+'/myself/' : dd;
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
			var hour = ends[0].indexOf('0') == 0 ? ends[0].replace('0','') : ends[0];
			var endtime = ends[1]=='30' ? parseInt(hour)+1 + ':00' : hour + ':30';
			
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
					// alert('您已经预约成功，请勿重复预约');
				}

			// if($(this).hasClass('btn_submit')){
			// 	var _val = l.getValue();
			// 	l.setTimeValue(_val.start, _val.end);
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
		// var _b = _list.index(_tmp[0]);
		var _b = _list.index(l.list.find('li.optional[endtime="'+e+'"]')[0]);
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

/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


/*

 * Summary: lyz.calendar1.0

 * Author: 

 * Date: 2011

 * Emial: c_sharp@live.cn

 * Example:
            $(function () {
                $("#txtBeginDate").calendar({
                    controlId: "divDate",                                       // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
                    speed: 200,                                                 // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
                    complement: true,                                           // 是否显示日期或年空白处的前后月的补充,默认：true
                    readonly: true,                                             // 目标对象是否设为只读，默认：true
                    upperLimit: new Date(),                                     // 日期上限，默认：NaN(不限制)
                    lowerLimit: new Date("2011/01/01"),                         // 日期下限，默认：NaN(不限制)
                    callback: function () {                                     // 点击选择日期后的回调函数
                        alert("您选择的日期是：" + $("#txtBeginDate").val());
                }
            });

            $("#txtEndDate").calendar();
 */

jQuery.fn.extend({
    calendar: function(c) {
        function r() {
            $("#" + c.controlId).find(".tabD a").mouseup(function() {
                var a = new Date($("#" + c.controlId).find(".currentYear").text() + "/" + $("#" + c.controlId).find(".currentMonth").text() + "/1");
                if ($(this).hasClass("prevD")) {
                    a.setMonth(a.getMonth() - 1);
                    a.setDate($(this).text());
                    var b = c.speed;
                    c.speed = 0;
                    $("#" + c.controlId).find(".prevMonth").triggerHandler("mouseup");
                    c.speed = b
                } else if ($(this).hasClass("nextD")) {
                    a.setMonth(a.getMonth() + 1);
                    a.setDate($(this).text());
                    b = c.speed;
                    c.speed = 0;
                    $("#" + c.controlId).find(".nextMonth").triggerHandler("mouseup");
                    c.speed = b
                }
                var d = $(this).text();
                a = a.getFullYear() + "-" + (Number(a.getMonth() + 1) < 10 ? "0" + Number(a.getMonth() + 1) : Number(a.getMonth() + 1)) + "-" + (Number(d) < 10 ? "0" + d: d);
                n.val(a);
                $("#" + c.controlId + " div table a").removeClass("select");
                $("#" + c.controlId + " .tabD a:contains('" + d + "')").each(function() {
                    d == $(this).text() && !$(this).hasClass("prevD") && !$(this).hasClass("nextD") && $(this).addClass("select")
                });
                $("#" + c.controlId).hide();
                c.callback();
                $(n).blur();
            }).hover(function() {
                $(this).addClass("hover")
            },
            function() {
                $(this).removeClass("hover")
            })
        }
        function u() {
            $("#" + c.controlId).find(".tabM a").mouseup(function() {
                var a = s(Number($("#" + c.controlId).find(".currentYear").text()), Number($(this).attr("val")));
                D(a);
                r();
                $("#" + c.controlId).find(".currentMonth").text(Number($(this).attr("val")) + 1)
            }).hover(function() {
                $(this).addClass("hover")
            },
            function() {
                $(this).removeClass("hover")
            })
        }
        function v() {
            $("#" + c.controlId).find(".tabY a").mouseup(function() {
                var a = s(Number($(this).text()), Number($("#" + c.controlId).find(".currentMonth").text()) - 1);
                D(a);
                r();
                $("#" + c.controlId).find(".currentYear").text(Number($(this).text()))
            }).hover(function() {
                $(this).addClass("hover")
            },
            function() {
                $(this).removeClass("hover")
            })
        }
        function s(a, b) {
            newDate = new Date(a, b, 1);
            newDate.setDate(0);
            var d = 1,
            h = newDate.getDate();
            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() + 1);
            var m = newDate.getDay();
            if (m == 0) m = 7;
            h = h - m + 1;
            newDate.setMonth(newDate.getMonth() + 1);
            newDate.setDate(0);
            var o = newDate.getDate(),
            g = "<table class='tabD'>";
            g += "<tr><th>\u65e5</th><th>\u4e00</th><th>\u4e8c</th><th>\u4e09</th><th>\u56db</th><th>\u4e94</th><th>\u516d</th></tr>";
            var i = w(),
            l = "",
            p = "",
            t = "";
            c.complement || (t = "style='display:none'");
            for (var x = 0; x < 6; x++) {
                g += "<tr>";
                for (var y = 0; y < 7; y++) {
                    var j = x * 7 + y + 1 - m;
                    p = l = "";
                    if (c.lowerLimit != NaN && c.lowerLimit > new Date(newDate.getFullYear(), newDate.getMonth(), j) || c.upperLimit != NaN && new Date(newDate.getFullYear(), newDate.getMonth(), j) > c.upperLimit) if (0 < j && j <= o) {
                        if (newDate.getFullYear() == e && newDate.getMonth() == f && j == q) l = "current";
                        g += "<td><span class='" + l + "'>" + j + "</span></td>"
                    } else if (j <= 0) {
                        if (newDate.getFullYear() == e && newDate.getMonth() - 1 == f && h == q) l = "current";
                        g += "<td><span class='" + l + "' " + t + ">" + h + "</span></td>";
                        h++
                    } else {
                        if (j > o) {
                            if (newDate.getFullYear() == e && newDate.getMonth() + 1 == f && d == q) l = "current";
                            g += "<td><span class='" + l + "' " + t + ">" + d + "</span></td>";
                            d++
                        }
                    } else if (0 < j && j <= o) {
                        if (newDate.getFullYear() == e && newDate.getMonth() == f && j == q) l = "current";
                        if (newDate.getFullYear() == i.getFullYear() && newDate.getMonth() == i.getMonth() && j == i.getDate()) p = "select";
                        g += "<td><a class='" + p + " " + l + "'>" + j + "</a></td>"
                    } else if (j <= 0) {
                        if (newDate.getFullYear() == e && newDate.getMonth() - 1 == f && h == q) l = "current";
                        if (newDate.getFullYear() == i.getFullYear() && newDate.getMonth() - 1 == i.getMonth() && h == i.getDate()) p = "select";
                        g += "<td><a class='prevD " + p + " " + l + "' " + t + ">" + h + "</a></td>";
                        h++
                    } else if (j > o) {
                        if (newDate.getFullYear() == e && newDate.getMonth() + 1 == f && d == q) l = "current";
                        if (newDate.getFullYear() == i.getFullYear() && newDate.getMonth() + 1 == i.getMonth() && d == i.getDate()) p = "select";
                        g += "<td><a class='nextD " + p + " " + l + "' " + t + ">" + d + "</a></td>";
                        d++
                    }
                    g = g.replace("class=' '", "")
                }
                g += "</tr>"
            }
            g += "</table>";
            return g
        }
        function z(a) {
            var b = w(),
            d = "<table class='tabM'>";
            d += "<tr>";
            d += "<td><a val='0' " + (a == b.getFullYear() && 0 == b.getMonth() ? "class='select'": "") + " " + (a == e && 0 == f ? "class='current'": "") + ">\u4e00\u6708</a></td>";
            d += "<td><a val='1' " + (a == b.getFullYear() && 1 == b.getMonth() ? "class='select'": "") + " " + (a == e && 1 == f ? "class='current'": "") + ">\u4e8c\u6708</a></td>";
            d += "<td><a val='2' " + (a == b.getFullYear() && 2 == b.getMonth() ? "class='select'": "") + " " + (a == e && 2 == f ? "class='current'": "") + ">\u4e09\u6708</a></td>";
            d += "<td><a val='3' " + (a == b.getFullYear() && 3 == b.getMonth() ? "class='select'": "") + " " + (a == e && 3 == f ? "class='current'": "") + ">\u56db\u6708</a></td>";
            d += "</tr>";
            d += "<tr>";
            d += "<td><a val='4' " + (a == b.getFullYear() && 4 == b.getMonth() ? "class='select'": "") + " " + (a == e && 4 == f ? "class='current'": "") + ">\u4e94\u6708</a></td>";
            d += "<td><a val='5' " + (a == b.getFullYear() && 5 == b.getMonth() ? "class='select'": "") + " " + (a == e && 5 == f ? "class='current'": "") + ">\u516d\u6708</a></td>";
            d += "<td><a val='6' " + (a == b.getFullYear() && 6 == b.getMonth() ? "class='select'": "") + " " + (a == e && 6 == f ? "class='current'": "") + ">\u4e03\u6708</a></td>";
            d += "<td><a val='7' " + (a == b.getFullYear() && 7 == b.getMonth() ? "class='select'": "") + " " + (a == e && 7 == f ? "class='current'": "") + ">\u516b\u6708</a></td>";
            d += "</tr>";
            d += "<tr>";
            d += "<td><a val='8' " + (a == b.getFullYear() && 8 == b.getMonth() ? "class='select'": "") + " " + (a == e && 8 == f ? "class='current'": "") + ">\u4e5d\u6708</a></td>";
            d += "<td><a val='9' " + (a == b.getFullYear() && 9 == b.getMonth() ? "class='select'": "") + " " + (a == e && 9 == f ? "class='current'": "") + ">\u5341\u6708</a></td>";
            d += "<td><a val='10' " + (a == b.getFullYear() && 10 == b.getMonth() ? "class='select'": "") + " " + (a == e && 10 == f ? "class='current'": "") + ">\u5341\u4e00\u6708</a></td>";
            d += "<td><a val='11' " + (a == b.getFullYear() && 11 == b.getMonth() ? "class='select'": "") + " " + (a == e && 11 == f ? "class='current'": "") + ">\u5341\u4e8c\u6708</a></td>";
            d += "</tr>";
            d += "</table>";
            return d
        }
        function A(a) {
            a = Math.floor(a / 10) * 10;
            var b = "<table class='tabY'>",
            d = w(),
            h = "",
            m = "",
            o = "";
            c.complement || (o = "style='display:none'");
            for (var g = 0; g < 3; g++) {
                b += "<tr>";
                for (var i = 0; i < 4; i++) {
                    m = h = "";
                    if (g + 1 * i + 1 != 1 && (g + 1) * (i + 1) != 12) {
                        if (a == d.getFullYear()) h = "select";
                        if (a == e) m = "current";
                        b += "<td><a class='" + h + " " + m + "' >" + a + "</a></td>";
                        a++
                    } else if (g + 1 * i + 1 == 1) {
                        if (a - 1 == d.getFullYear()) h = "select";
                        if (a - 1 == e) m = "current";
                        b += "<td><a class='prevY " + h + " " + m + "' " + o + ">" + (a - 1) + "</a></td>"
                    } else {
                        if (a == d.getFullYear()) h = "select";
                        if (a == e) m = "current";
                        b += "<td><a class='nextY " + h + " " + m + "' " + o + ">" + a + "</a></td>"
                    }
                }
                b += "</tr>"
            }
            b += "</table>";
            return b
        }
        function B(a) {
            var b = $("#" + c.controlId).find(".reserve"),
            d = $("#" + c.controlId).find(".enabled");
            b.stop();
            d.stop();
            b.removeClass("reserve").addClass("enabled");
            d.removeClass("enabled").addClass("reserve");
            b.css({
                "margin-left": d.width() + "px",
                "margin-top": "0px"
            });
            b.empty().append(a);
            b.animate({
                "margin-left": "0px"
            },
            c.speed);
            d.animate({
                "margin-left": "-" + d.width() + "px"
            },
            c.speed,
            function() {
                d.empty()
            })
        }
        function C(a) {
            var b = $("#" + c.controlId).find(".reserve"),
            d = $("#" + c.controlId).find(".enabled");
            b.stop();
            d.stop();
            b.removeClass("reserve").addClass("enabled");
            d.removeClass("enabled").addClass("reserve");
            b.css({
                "margin-left": "-" + d.width() + "px",
                "margin-top": "0px"
            });
            b.empty().append(a);
            b.animate({
                "margin-left": "0px"
            },
            c.speed);
            d.animate({
                "margin-left": d.width() + "px"
            },
            c.speed,
            function() {
                d.empty()
            })
        }
        function D(a) {
            var b = $("#" + c.controlId).find(".reserve"),
            d = $("#" + c.controlId).find(".enabled");
            b.stop();
            d.stop();
            b.removeClass("reserve").addClass("enabled");
            d.removeClass("enabled").addClass("reserve");
            $("#" + c.controlId).css({
                "z-index": 1
            });

            b.css({
                "z-index": -1
            });
            d.css({
                "z-index": -1
            });
            b.css({
                "margin-left": "0px",
                "margin-top": d.height() + "px"
            });
            b.empty().append(a);
            b.animate({
                "margin-top": "0px"
            },
            c.speed);
            d.animate({
                "margin-top": "-" + d.width() + "px"
            },
            c.speed,
            function() {
                d.empty();
                $("#" + c.controlId).css({
                    "z-index": 0
                });
                b.css({
                    "z-index": 0
                });
                d.css({
                    "z-index": 0
                })
            })
        }
        function E(a) {
            var b = $("#" + c.controlId).find(".reserve"),
            d = $("#" + c.controlId).find(".enabled");
            b.stop();
            d.stop();
            b.removeClass("reserve").addClass("enabled");
            d.removeClass("enabled").addClass("reserve");
            $("#" + c.controlId).css({
                "z-index": 1
            });
            b.css({
                "z-index": -1
            });
            d.css({
                "z-index": -1
            });
            b.css({
                "margin-left": "0px",
                "margin-top": "-" + d.height() + "px"
            });
            b.empty().append(a);
            b.animate({
                "margin-top": "0px"
            },
            c.speed);
            d.animate({
                "margin-top": d.width() + "px"
            },
            c.speed,
            function() {
                d.empty();
                $("#" + c.controlId).css({
                    "z-index": 0
                });
                b.css({
                    "z-index": 0
                });
                d.css({
                    "z-index": 0
                })
            })
        }
        function w() {
            re = /(\d\d\d\d)(\W)?(\d\d)(\W)?(\d\d)/g;
            var a = n.val();
            a = a.replace(re, "$1/$3/$5@").split("@")[0];
            return new Date(a)
        }
        function F(a) {
            var b = [];
            b.x = a.offsetLeft;
            for (b.y = a.offsetTop; a = a.offsetParent;) {
                b.x += a.offsetLeft;
                b.y += a.offsetTop
            }
            return b
        }
        c = jQuery.extend({
            controlId: $(this).attr("id") + "Calendar",
            speed: 200,
            complement: true,
            readonly: true,
            upperLimit: NaN,
            lowerLimit: NaN,
            callback: function() {}
        },
        c || {});
        var n = $(this);
        if (c.readonly) {
            n.attr("readonly", true);
            n.bind("keydown",
            function() {
                if (event.keyCode == 8) event.keyCode = 0
            })
        }
        today = new Date;
        var e = today.getFullYear(),
        f = today.getMonth(),
        q = today.getDate(),
        k = "";
        k += "<div id='" + c.controlId + "'class='calendar'>";
        k += "  <div class='calMain'>";
        k += "    <div class='calTitle'>";
        k += "      <a class='prevMonth'></a><span class='t_date'><span class='currentYearText'><a class='currentYear'>" + e + "</a>\u5e74</span><span class='currentMonthText'><a class='currentMonth'>" + (f + 1) + "</a>\u6708</span></span><a class='nextMonth'></a>";
        k += "    </div>";
        k += "    <div class='calContent'>";
        k += "      <div class='reserve'>";
        k += "      </div>";
        k += "      <div class='enabled'>";
        k += s(e, f);
        k += "      </div>";
        k += "    </div>";
        k += "  </div>";
        k += "</div>";
        $("body").append(k);
        r();
        $("#" + c.controlId).find(".prevMonth").mouseup(function() {
            if ($("#" + c.controlId).find(".enabled > .tabD").length > 0) {
                var a = $("#" + c.controlId).find(".currentYear"),
                b = $("#" + c.controlId).find(".currentMonth"),
                d = s(Number(a.text()), Number(b.text()) - 2);
                C(d);
                if (Number(b.text()) != 1) b.text(Number(b.text()) - 1);
                else {
                    a.text(Number(a.text()) - 1);
                    b.text("12")
                }
                r()
            } else if ($("#" + c.controlId).find(".enabled > .tabM").length > 0) {
                d = z(Number($("#" + c.controlId).find(".currentYear").text()) - 1);
                C(d);
                u();
                $("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) - 1)
            } else if ($("#" + c.controlId).find(".enabled > .tabY").length > 0) {
                d = A(Number($("#" + c.controlId).find(".currentYear").text()) - 10);
                C(d);
                v();
                $("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) - 10)
            }
        });
        $("#" + c.controlId).find(".nextMonth").mouseup(function() {
            if ($("#" + c.controlId).find(".enabled > .tabD").length > 0) {
                var a = $("#" + c.controlId).find(".currentYear"),
                b = $("#" + c.controlId).find(".currentMonth"),
                d = s(Number(a.text()), Number(b.text()));
                B(d);
                if (Number(b.text()) != 12) b.text(Number(b.text()) + 1);
                else {
                    a.text(Number(a.text()) + 1);
                    b.text("1")
                }
                r()
            } else if ($("#" + c.controlId).find(".enabled > .tabM").length > 0) {
                d = z(Number($("#" + c.controlId).find(".currentYear").text()) + 1);
                B(d);
                u();
                $("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) + 1)
            } else if ($("#" + c.controlId).find(".enabled > .tabY").length > 0) {
                d = A(Number($("#" + c.controlId).find(".currentYear").text()) + 10);
                B(d);
                v();
                $("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) + 10)
            }
        });
        $("#" + c.controlId).find(".currentMonthText").mouseup(function() {
            if (! ($("#" + c.controlId).find(".enabled > .tabM").length > 0)) {
                var a = z(Number($("#" + c.controlId).find(".currentYear").text()));
                E(a);
                u()
            }
        });
        $("#" + c.controlId).find(".currentYearText").mouseup(function() {
            if (! ($("#" + c.controlId).find(".enabled > .tabY").length > 0)) {
                var a = A(Number($("#" + c.controlId).find(".currentYear").text()));
                E(a);
                v()
            }
        });
        n.bind("click focus",
        function() {
            if ($("#" + c.controlId + ":hidden").length != 0) {
                $(".calendar").hide();
                var a = $("#" + c.controlId),
                b = F(n[0]),

                /* === jQuery 1.5.1用到的 === */
                // d = b.x + Number(n.attr("clientLeft")) + 2;
                // b = b.y + Number(n.attr("clientTop")) + Number(n.attr("clientHeight")) - 1;

                /* === jQuery 1.7.2用到的 === */
                d = b.x;
                b = Number(n.offset().top) + Number(n.outerHeight());

                a.css({
                    top: b + "px",
                    left: d + "px"
                });
                d = $("#" + c.controlId).width();
                b = $("#" + c.controlId).height();
                a.width(0);
                a.height(0);
                a.show().animate({
                    width: d + "px",
                    height: b + "px"
                },
                c.speed);
                a.bind("selectstart",
                function() {
                    return false
                }).bind("mousedown",
                function() {
                    return false
                })
            }
        });
        $(document).mouseup(function(a) {
            if ($(a.target).attr("id") != n.attr("id") && ($(a.target).parentsUntil("#" + c.controlId).parent().length == 0 || $(a.target).parentsUntil("#" + c.controlId).parent()[0].id != c.controlId)) $("#" + c.controlId).hide()
        })
    }
});

/* =-=-=-=-=-=-=-=-=-=-=-= xes.ajax.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * xes.ajax.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var xes = xes || {};

xes.ajax = xes.ajax || {};

(function(){
	var a = xes.ajax;
	a._load = $('.laodding');
	a._bg = $('.loadding_bg');
	a._ajax = function(url,data,sucess,error){
		$.ajax({
			async: true,
			type: 'POST',
			url : url,
			data: data,
			dataType: 'json',
			jsonp : 'callback',
			timeout: 70000,
			complete:function(){},
			success:function(d){
				sucess(d);
			},
			error:function(){}
		});
	};
	a.start = function(dom, fn){
		$(dom).ajaxStart(function(handle){
			if(fn){
				fn(handle);
			}else{
				a._loadding('show');
			}
		});
	};
	a.stop = function(dom, fn){
		$(dom).ajaxStop(function(handle){
			if(fn){
				fn(handle);
			}else{
				a._loadding('hide');
			}
		});
	};
	a._loadding = function(tp){
		if(tp == 'show'){
			a._load.show();
			a._bg.show();
		}else{
			a._load.hide();
			a._bg.hide();
		}
	};
	a.sync = function(){};
	a.get = function(){};
	a.set = function(){};
	a.post = function(url, data, sucess, error){
		a._ajax(url, data, sucess, error);
	};
	a.getJSON = function(){};
	a.callback = function(){};
	a.status = function(){};

})();


xes.post = xes.ajax.post;


/* =-=-=-=-=-=-=-=-=-=-=-= xes.form.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * form操作
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var xform = xform || {};

(function(){
	var f = xform;

		/**
		* 复选框全选
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3">
		*
		*			<input type="checkbox" id="checkAll" name="checkAll" onclick="checkAllBoxes_1('checkbox[]');">全选
		*
		* @param string cbs_id 复选框id
		* @return
		*/
		f.checkAll = function (cbs_id) {
			var ifChecked = $('input[type="checkbox"][id="checkAll"]').attr('checked');
			$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
				$(this).attr('checked', ifChecked);
			});
		};


		/**
		* 复选框全选
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3">
		*
		*			<a href="javascript:void(0);" onclick="checkAllBoxes_2('checkbox[]'); return false;">全选</a>
		*
		* @param string cbs_id 复选框id
		* @return
		*/
		f.checkAll2 = function (cbs_id) {
			var uncheckedBox = 0;
			// 全选所有复选框
			$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
				if($(this).attr('checked') == false) {
					$(this).attr('checked', true);
					uncheckedBox = 1;
				}
			});

			// 如果所有复选框都已被选择,则全部取消选择
			if(uncheckedBox == 0) {
				$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
					$(this).attr('checked', false);
				});
			}
		};

		/**
		* 复选框反选
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3" checked>
		*
		*			<a href="javascript:void(0);" onclick="checkInverseBoxes('checkbox[]'); return false;">反选</a>
		*
		* @param string cbs_id 复选框id
		* @return
		*/
		f.checkInverse = function (cbs_id) {
			$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
				$(this).attr('checked', $(this).attr('checked') ? false : true);
			});
		};



		/**
		* 复选框选择(根据复选框的值 选中复选框)
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3">
		*
		*			<a href="javascript:void(0);" onclick="checkBoxes('checkbox[]', '2,3'); return false;">复选框选择</a>
		*
		* @param string cbs_ids 复选框id
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.checkBoxes = function (cbs_id, cbs_values) {
			$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
				$(this).attr('checked', false);
			});
			$.each(cbs_values.split(','), function(i, n) {
				$('input[type="checkbox"][id="' + cbs_id + '"][value="' + n + '"]').attr('checked', true);
			});
		};


		/**
		* 单选框选择(根据单选框的值 选中单选框)
		* @example
		*			<input type="radio" id="type" name="type" value="1">
		*			<input type="radio" id="type" name="type" value="2">
		*			<input type="radio" id="type" name="type" value="3">
		*
		*			<a href="javascript:void(0);" onclick="checkRadio('type', '2'); return false;">单选框选择</a>
		*
		* @param string r_id 单选框id
		* @param string r_value 要选择的单选框的值
		* @return
		*/
		f.checkRadio = function (r_id, r_value) {
			$('input[type="radio"][id="' + r_id + '"][value="' + r_value + '"]').attr('checked', true);
		};


		/**
		* 下拉框选择(根据下拉框的值 选中下拉框)
		* @example
		*			<select id="city" name="city">
		*			<option value='1'>北京</option>
		*			<option value='2'>天津</option>
		*			<option value='3'>上海</option>
		*			</select>
		*
		*			<a href="javascript:void(0);" onclick="checkSelect('city', '2'); return false;">下拉框选择</a>
		*
		* @param string r_id 下拉框id
		* @param string r_value 要选择的下拉框的值
		* @return
		*/
		f.checkSelect = function (s_id, s_value) {
			$('select[id="' + s_id + '"] option[value="' + s_value + '"]').attr('selected', true);
		};

		/**
		* 获取复选框选中项的值,以逗号隔开
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3" checked>
		*
		*			<a href="javascript:void(0);" onclick="alert(getCheckedValue('checkbox[]')); return false;">复选框选择</a>
		*
		* @param string cbs_ids 复选框id
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.getCheckedValue = function (cbs_id) {
			var values = '';
			$.each($('input[name="' + cbs_id + '"]:checked'), function() {
				values = values + ',' + $(this).attr('value');
			});
			return values.slice(1);
		};

		/**
		* 获取复选框选中项的TEXT值,以逗号隔开
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3" checked>
		*
		*			<a href="javascript:void(0);" onclick="alert(getCheckedValue('checkbox[]')); return false;">复选框选择</a>
		*
		* @param string cbs_ids 复选框id
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.getCheckedText = function (cbs_id) {
			var values = '';
			$.each($('input[name="' + cbs_id + '"]:checked'), function() {
				values = values + $(this).attr('title');
			});
			return values;
		};

		/**
		* 获取下拉框选中项的值
		* @example
		*			<select id="city" name="city">
		*			<option value='1'>北京</option>
		*			<option value='2'>天津</option>
		*			<option value='3'>上海</option>
		*			</select>
		*
		* @param string s_id 下拉框id
		* @param string selected_value 要选择的下拉框的值
		* @return string
		*/
		f.getSelectedText = function (s_id) {
			var value = ''
			if($('select[id="' + s_id + '"] option:selected').attr('value') != ''){
				value = $('select[id="' + s_id + '"] option:selected').text();
			}
			return value;
		};

		/**
		* 删除操作确认
		* @example
		*			<a href="javascript:void(0);" onclick="confirmDelete('确认删除\"二年级\"么?', '/grades/delete/2/'); return false;">删除</a>
		*
		* @param string msg 提示文字
		* @param string url 确认后要跳转的URL地址
		* @return
		*/
		f.confirmDelete = function (msg, url) {
			if(confirm(msg)) {
				window.location.href = url;
			}
		};


		/**
		* 当点击复选框时，把复选框的值添加或删除到cookie,并在分页时把选中的checkbox值选中
		*
		* @param string id table ID
		* @param string name 存在COOKIE中的KEY值例如cookie[name] = ',2,3,4,5,'
		*/
		f.tableCheckbox = function (tableid, name){
			if(name==''){name = 'checkvalue';}
			//cookie中存放的值
			var cookievalue = $.cookie(name);
			if(cookievalue==null){
				cookievalue = ',';
			}
			$.each($('table[id='+tableid+'] tr input[type="checkbox"]'),function (){
				var indexof = cookievalue.indexOf(','+$(this).val()+',')
				if(indexof>=0){
					$(this).attr('checked',true);
				}
			});

			$('table[id='+tableid+'] tr input[type="checkbox"]').click(function(){
				//点击checkbox的值
				var checkedvalue = $(this).val();
				//方便搜素特殊处理的值
				//var searchvalue = ','+$.cookie(name);
				//如果checkbox为选中状态
				if($(this).attr('checked') === true){
					//查找选中checkbox值在cookie中是否存在
					var indexof = cookievalue.indexOf(','+checkedvalue+',')
					//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
					if(indexof == -1){
						//将指定的值添加到cookie中
						cookievalue = cookievalue+checkedvalue+',';
					}
					$.cookie(name, cookievalue, { path: '/', expires: 0 });
				}
				//如果checkbox为未选中状态
				if($(this).attr('checked') === false){
					//查找选中checkbox值在cookie中是否存在
					var indexof = cookievalue.indexOf(','+checkedvalue+',')
					//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
					if(indexof >=0 ){
						//删除cookie中指定的值
						cookievalue = cookievalue.replace(','+checkedvalue+',' , ',');

					}
					$.cookie(name, cookievalue, { path: '/', expires: 0 });
				}
			});
		}





})();


xes.form = xform;







// 生成随机字符串
function generateMixed(n) {
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
};


/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * Date日期处理方法
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

xes.date = xes.date || {};

(function(){
	var d = xes.date;
	/**
	 * 根据日期获得星期数
	 * alert(getWeekday('2012-12-3'))
	 */
	d.getWeek = function(sdate){
		var _date = new Date(sdate.replace(/-/g, '/'));
	    var _week = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六'];
	    return _week[_date.getDay()];
	};


})();


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





