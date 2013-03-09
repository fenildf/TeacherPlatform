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

/* -------------------- xes.iframe.js --------------------- */

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
			_setHeight();
		}
	};
	f.getUrl = function(){
		var _local = window.location,
			_pathname = _local.pathname;
		return _pathname;
	};
})();
$(function(){

	// setTimeout(function(){
	xes.iframe.setHeight();
	// },100);	
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
};

/**
 * 打开标签（表单提交），非链接点击时
 */
var goTab = function(url, title, id, closeSelf){
	if(closeSelf){
		window.parent.getActiveTabs(function(self){
			var closeID = self.attr('id');
			closeID = closeID.replace('tab_','');
			window.parent.goTabs(url, title, id, closeID);
		});

		
	}else{
		window.parent.getActiveTabs(function(self){
			window.parent.goTabs(url, title, id);
		});
	}
}
/**
 * 刷新标签
 */
var refreshTab = function(id){
	// alert(id);
	// console.log(window.location.href);
	// window.parent.refreshTabs(id);
	var url = window.location.href;
	if(url.split('###').length>1){
		url = url.replace(/###$/,'');
	}
	window.location.href = url;
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

//获得iframe的点击事件
var isDomClick = function(fn){
	$(document).unbind('click').click(function(event){
		if(fn){
			fn(event);
		}else{
			return event;
		}
	});
};

var unDomClick = function(){
	$(document).unbind('click');
};

/* -------------------- ui/xes.ui.tips.js --------------------- */
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
			xes.tips = xes.ui.tips;
		});
	}
})(xes);


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
	l.getJson = function(dd, fn, tp, room){
		var _data=[{times:"0:00",status:"optional",teacher:""},{times:"0:30",status:"optional",teacher:""},{times:"1:00",status:"optional",teacher:""},{times:"1:30",status:"optional",teacher:""},{times:"2:00",status:"optional",teacher:""},{times:"2:30",status:"optional",teacher:""},{times:"3:00",status:"optional",teacher:""},{times:"3:30",status:"optional",teacher:""},{times:"4:00",status:"selected",teacher:"许强"},{times:"4:30",status:"selected",teacher:"许强"},{times:"5:00",status:"optional",teacher:""},{times:"5:30",status:"optional",teacher:""},{times:"6:00",status:"optional",teacher:""},{times:"6:30",status:"optional",teacher:""},{times:"7:00",status:"selected",teacher:"许强"},{times:"7:30",status:"selected",teacher:"许强"},{times:"8:00",status:"selected",teacher:"许强"},{times:"8:30",status:"selected",teacher:"许强"},{times:"9:00",status:"selected",teacher:"许强"},{times:"9:30",status:"optional",teacher:""},{times:"10:00",status:"optional",teacher:""},{times:"10:30",status:"optional",teacher:""},{times:"11:00",status:"selected",teacher:"许强"},{times:"11:30",status:"selected",teacher:"许强"},{times:"12:00",status:"optional",teacher:""},{times:"12:30",status:"selected",teacher:"许强"},{times:"13:00",status:"optional",teacher:""},{times:"13:30",status:"optional",teacher:""},{times:"14:00",status:"optional",teacher:""},{times:"14:30",status:"selected",teacher:"许强"},{times:"15:00",status:"optional",teacher:""},{times:"15:30",status:"selected",teacher:"许强"},{times:"16:00",status:"selected",teacher:"许强"},{times:"16:30",status:"selected",teacher:"许强"},{times:"17:00",status:"optional",teacher:""},{times:"17:30",status:"optional",teacher:""},{times:"18:00",status:"optional",teacher:""},{times:"18:30",status:"selected",teacher:"许强"},{times:"19:00",status:"selected",teacher:"许强"},{times:"19:30",status:"selected",teacher:"许强"},{times:"20:00",status:"selected",teacher:"许强"},{times:"20:30",status:"optional",teacher:""},{times:"21:00",status:"selected",teacher:"许强"},{times:"21:30",status:"selected",teacher:"许强"},{times:"22:00",status:"selected",teacher:"许强"},{times:"22:30",status:"optional",teacher:""},{times:"23:00",status:"optional",teacher:""},{times:"23:30",status:"selected",teacher:"许强"}];

		//本地调试
		// return _data;
		
		//程序调用
		var _oldtime = $('#oldDate').val();
		var _courseID = $('#courseId').val();
		var url = tp ? dd+'/'+_courseID : dd;
		var _room = room || 1;
	 	xes.post('/liveCourses/ajaxLiveListByDate/'+ _room +'/'+ url, {}, function(result){
	 		if(fn){
	 			if(result.sign == 1){
					fn(result);
				}else{
					alert(result.msg);
				}
	 			
	 		}else{
				if(result.sign == 1){
					return result.msg[_room];
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
		// console.log(_d);
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
	l.createTimeList = function(day,tp,room){
		var _room = room || 1;
		if(day){
			xes.liveTime.getJson(day,function(d){
				if(d.sign == 1){
					$('#liveChannel').val(_room);
					xes.liveTime.create(d.msg[_room]);
				}else{
					alert(d.msg);
				}
			},tp,_room);
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

/* -------------------- ui/xes.ui.calendar.js --------------------- */
/*
 * 日历
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
            function(e) {
                // if (event.keyCode == 8) event.keyCode = 0
                if(e.keyCode == 8){
                    $(this).val('');
                }
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

/* -------------------- xes.ajax.js --------------------- */

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


/* -------------------- xes.form.js --------------------- */
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
		* 复选框选择(根据复选框的值 选中复选框)
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3">
		*
		*			<a href="javascript:void(0);" onclick="checkBoxes('checkbox[]', '2,3'); return false;">复选框选择</a>
		*
		* @param string cbs_name 复选框name
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.setCheckBox = function (cbs_name, cbs_values) {
			$.each($('input[type="checkbox"][name="' + cbs_name + '"]'), function() {
				$(this).attr('checked', false);
			});
			$.each(cbs_values.split(','), function(i, n) {
				$('input[type="checkbox"][name="' + cbs_name + '"][value="' + n + '"]').attr('checked', true);
			});
		}

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
			var box = $('#'+tableid).find('input:checkbox');
			var checkboxName = box.attr('name');
			// 获取已有的cookie值
			var cookieVal = $.cookie(tableid);
			if(cookieVal && cookieVal != ''){
				//根据cookie值设置已选项
				f.setCheckBox(checkboxName, cookieVal);
			}	
	 		box.click(function(){
	 			f.setCheckedValue(tableid, this);
	 		});
			// if(name==''){name = 'checkvalue';}
			// //cookie中存放的值
			// var cookievalue = $.cookie(name);
			// if(cookievalue==null){
			// 	cookievalue = ',';
			// }
			// $.each($('table[id='+tableid+'] tr input[type="checkbox"]'),function (){
			// 	var indexof = cookievalue.indexOf(','+$(this).val()+',');
			// 	if(indexof>=0){
			// 		$(this).attr('checked',true);
			// 	}
			// });

			// $('table[id='+tableid+'] tr input[type="checkbox"]').click(function(){

			// 	//点击checkbox的值
			// 	var checkedvalue = $(this).val();
			// 	//方便搜素特殊处理的值
			// 	//var searchvalue = ','+$.cookie(name);
			// 	//如果checkbox为选中状态
			// 	if($(this).attr('checked') === 'checked'){
			// 		//查找选中checkbox值在cookie中是否存在
			// 		var indexof = cookievalue.indexOf(','+checkedvalue+',');
			// 		//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
			// 		if(indexof == -1){
			// 			//将指定的值添加到cookie中
			// 			cookievalue = cookievalue+checkedvalue+',';
			// 		}
			// 	}

			// 	//如果checkbox为未选中状态
			// 	if($(this).attr('checked') != 'checked'){
			// 		//查找选中checkbox值在cookie中是否存在
			// 		var indexof = cookievalue.indexOf(','+checkedvalue+',')
			// 		//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
			// 		if(indexof >=0 ){
			// 			//删除cookie中指定的值
			// 			cookievalue = cookievalue.replace(','+checkedvalue+',' , ',');

			// 		}
			// 	}
			// 	$.cookie(name, cookievalue, { expires: 0 });
			// 	// cookievalue = ',';
			// });
			
		};

		// 把tableCheckbox选中的值（cookie里面的）转化为数组格式
		f.getCheckboxValue = function (cookieName){
			var arr = $.cookie(cookieName);
			if(arr){
				arr = arr.replace(/^,/,'').replace(/,$/,'');
				return arr;
			}else{
				return false;
			}
		};
		/*
		 * input表单默认值的显示与隐藏
		 * 获取焦点的时候隐藏默认提示信息，失去焦点的时候，如果是空值则显示默认提示信息
		 */
		f.defaultValue = function(){
			var placeholder = '';
			$("input:text").focus(function () { 
				this.defaultValue = $(this).attr('placeholder') || '';
				var check1 = $(this).val(); 
				if (check1 == this.defaultValue) { 
					$(this).val(''); 
				}
				$(this).attr('placeholder','');
			}); 
			$("input:text").blur(function () {
				var d = this.defaultValue || '';
				var check1 = $(this).val(); 
				if (check1 == '') { 
					$(this).attr('placeholder', d); 
				}
			}); 
			
		};

		/**
		 * 根据点击checkbox设置cookie值
		 * @param  {string} id 存储已选值的cookiename，同时也是checkbox外围容器的id名
		 * @param {DOM} box 点击的checkbox对象 this
		 * 
		 */
		f.setCheckedValue =	function (cookiename,box){

 			// 获取已有的cookie值
 			var _cookieval = $.cookie(cookiename);

 			// 将cookie值转化为数组；
 			var _values = (_cookieval && _cookieval != '') ? _cookieval.split(',') : [];

 			// 去除数组中的空白项（原来方法里面里面开头的“，”）
 			_values = $.grep(_values, function(n) {return $.trim(n).length > 0;})

 			// 选中状态
			// var __checked = $(box).attr('checked');
			var __checked = box.checked;

			// 当前点击对象的值
			var __val = box.value;

			// 查看当前选中的值在cookie中是否存在，返回其索引值，0开头
			var __index = $.inArray(__val, _values);

			/**
			 * 如果选中，且cookie中不存在，则添加
			 * 如果取消选中，且cookie里存在，则删除
			 */
			if( __checked && (__index == -1) ){

				_values.push(__val);

			}else if( !__checked && (__index >= 0)){

				_values.splice(__index,1);

			}

			$.cookie(cookiename, _values);

		}

		/**
		 * 清除checkbox的已选项
		 * @param  {string} id 存储已选值的cookiename，同时也是checkbox外围容器的id名
		 * @return {[type]}            [description]
		 */
		f.emptyChecked = function(id){
			var _val = $.cookie(id);
			if(_val){
				_val = (_val !='') ? _val.split(',') : [];
				if(_val.length > 0 ){
					var _checkbox = $('#'+id).find('input[type="checkbox"]');
		 			_checkbox.each(function(){
		 				// var _v = $(this).val();
		 				var _v = this.value;
		 				if( $.inArray(_v , _val) > -1){
		 					this.checked = false;
		 				}
		 			});
				}
				$.cookie(id, null);
			}
		}

		/**
		 * checkbox的点击事件
		 * @param  {string} id 存储已选值的cookiename，同时也是checkbox外围容器的id名
		 * @param  {string} checkboxName [checkbox的name值]	
		 * @return {[type]}              [description]
		 */
		f.checkboxClick = function(id,checkboxName){
			var box = $('#'+id).find('input:checkbox');
			var checkboxName = box.attr('name');
			// 获取已有的cookie值
			var cookieVal = $.cookie(id);
			if(cookieVal && cookieVal != ''){
				//根据cookie值设置已选项
				f.setCheckBox(checkboxName, cookieVal);
			}	
	 		$('#'+id).find('input:checkbox').click(function(){
	 			f.setCheckedValue(id, this);
	 		});
		};

})();


xes.form = xform;


// 把tableCheckbox选中的值（cookie里面的）转化为数组格式
// function getCheckValue(cookieName){
// 	var arr = $.cookie(cookieName);
// 	if(arr){
// 		arr = arr.replace(/^,/,'').replace(/,$/,'');
// 		return arr;
// 	}else{
// 		return false;
// 	}
// }



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


/* -------------------- xes.date.js --------------------- */
/*
 * Date日期处理方法
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


/**      
* 对Date的扩展，将 Date 转化为指定格式的String      
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
* eg:      
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18   
    
//var date = new Date();      
//window.alert(date.pattern("yyyy-MM-dd hh:mm:ss"));      
*/        
Date.prototype.format=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "\u65e5",         
    "1" : "\u4e00",         
    "2" : "\u4e8c",         
    "3" : "\u4e09",         
    "4" : "\u56db",         
    "5" : "\u4e94",         
    "6" : "\u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}

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

    d.clock = d.clock || {};
    d.clock.date = '';
    d.clock.dom = '';

    d.clock.count = function(){
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.date = date.getDate();
        this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
        this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        this.toString = function() {
            return "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
        };
        this.toSimpleDate = function() {
            return this.year + "-" + this.month + "-" + this.date;
        };
        this.toDetailDate = function() {
            return this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
        };
        this.display = function(ele) {
            var count = new d.clock.count(day);

            var html = count.toDetailDate();
            ele.html(html); 
            window.setTimeout(function() {
                count.display(ele);
            }
            , 1000);
        };
    };

    d.clock.serverClock = function(s_year, s_month, s_day, s_hour, s_min, s_sec) {
        //估计从服务器下载网页到达客户端的延时时间，默认为1秒。 
        var _delay = 1000;

        //服务器端的时间 
        var serverTime = null;
        if(arguments.length == 0) {
            //没有设置服务器端的时间，按当前时间处理 
            serverTime = new Date();
            _delay = 0;
        } else {
            serverTime = new Date(s_year, s_month - 1, s_day, s_hour, s_min, s_sec)
        };

        //客户端浏览器的时间 
        var clientTime = new Date();
        //获取时间差 
        var _diff = serverTime.getTime() - clientTime.getTime();

        //设置从服务器下载网页到达客户端的延时时间，默认为1秒。 
        this.set_delay = function(value) {
            _delay = value;
        };

        //获取服务的日期时间 
        this.get_ServerTime = function(formatstring) {
            clientTime = new Date();
            serverTime.setTime(clientTime.getTime() + _diff + _delay);
            if(formatstring == null) {
                return serverTime;
            }else{
                return serverTime.format(formatstring);
            }
        };
    };

    d.clock.start = function(dom,day){
        var day = dom.text();
        var time = {};
        time.tmp = day.split(' ');
        time.days = time.tmp[0].split('-');
        time.times = time.tmp[1].split(':');

        time.year = time.days[0];
        time.month = time.days[1];
        time.day = time.days[2];

        time.hour = time.times[0];
        time.minute = time.times[1];
        time.second = time.times[2];

        var srvClock = new d.clock.serverClock(time.year, time.month, time.day, time.hour, time.minute, time.second); 

        window.setInterval(function(){ 
            var html = srvClock.get_ServerTime('yyyy-MM-dd HH:mm:ss');
            dom.html(html); 
        },500);

    };

    d.clock.stop = function(){
        clearTimeout(d.clock.timeout);
    };

})();



/* -------------------- xes.form.verify.js --------------------- */

/*
 * 表单验证
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var formVerify = formVerify || {};

(function(){
	var v = formVerify;
	v.tips = $('.tips');
	v.tipsError = '';
	v.tipsSucceed = '';
	v.checkEmpty = function(input){
		var dom = $(input);
		v.tips = dom.nextAll('.tips_'+dom.attr('id'));
		if(dom.val() == ''){
			v.setError(dom.attr('title') + '不能为空');
		}else{
			v.emptyError(input);
		}
	};

	v.checkNumber = function(input){
		var reg = '';
		if(reg){
			v.setTips('不是数字格式',input);
		}else{
			v.emptyTips(input);
		}
	};

	v.setError = function(text,input){
		if(input){
			var dom = $(input);
			v.tips = dom.nextAll('.tips_'+dom.attr('id'));	
		}
		v.tips.addClass('tips_error');
		v.tips.text(text);
	};

	v.emptyError = function(input){
		if(input){
			var dom = $(input);
			v.tips = dom.nextAll('.tips_'+dom.attr('id'));	
		}
		
		v.tips.removeClass('tips_error');
		v.tips.text('');
	};

})();


xes.formVerify = formVerify;

/* =-=-=-=-=-=-=-=-=-=-=-= live_edit.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function () {
	//直播状态：新建/编辑
	var _date = $('#liveDate').val();
	var room = $('#liveChannel').val();
	// console.log('room:'+room);
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
	//切换直播间
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
		//如果只切换直播间不选时间，则存储上一次提交的时间和房间
		var box = {
			start : $('#liveTimeStartInput'),
			end : $('#liveTimeEndInput'),
			room : $('#liveChannel')
		};
		var old = {
			timeStart : box.start.attr('old'),
			timeEnd : box.end.attr('old'),
			room : box.room.attr('old')
		};
		if(_room != old.room){
			box.start.val('');
			box.end.val('');
		}else{
			box.start.val(old.timeStart);
			box.end.val(old.timeEnd);
			box.room.val(old.channel);
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

	// var btns = $('#courseName,#gradeId,#subjectId,#description,#liveDate,#resourcePath');
	var btns = $('#courseName,#gradeId,#subjectId,#description,#resourcePath');
	btns.blur(function(){
		if($(this).attr('id') == 'courseName'){
			checkLiveTitle();
		}else{
			xes.formVerify.checkEmpty(this);
		}
	});
});

//提交时检测表单
function checkLiveForm(){
	// var inputs = $('#courseName,#gradeId,#subjectId,#description,#liveDate,#resourcePath');
	var inputs = $('#courseName,#gradeId,#subjectId,#description,#resourcePath');
	inputs.each(function(){
		if(this.id == 'courseName'){
			checkLiveTitle();
		}else{
			xes.formVerify.checkEmpty(this);
		}
	});
	//检查直播时间
	// checkLiveTime();
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
		if(val.length < 4 || val.length > 40){
			// return '标题字数只能在4到20个字之间';
			xes.formVerify.setError('标题字数只能在4到40个字之间',input[0]);
		}else{
			// return true;
			xes.formVerify.emptyError(input[0]);
		}
	}
}

//检查直播时间
function checkLiveTime(){
	var box = {
			start : $('#liveTimeStartInput'),
			end : $('#liveTimeEndInput'),
			room : $('#liveChannel')
		};
		var old = {
			timeStart : box.start.attr('old'),
			timeEnd : box.end.attr('old'),
			room : box.room.attr('old')
		};
	if((box.start.val() == '' || box.end.val() == '') && box.room.val() != old.room){
		box.start.val(old.timeStart);
		box.end.val(old.timeEnd);
		// old.room = old.room ? old.room : '1';
		var r = 1;
		if(old.room){
			r = old.room;
		}else{
			r = $('#time_week a.current').attr('id');
			r = r.replace('room_','');

		}
		box.room.val(r);
	}
}