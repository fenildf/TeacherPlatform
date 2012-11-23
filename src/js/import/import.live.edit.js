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
			setTimeout(function(){
				_setHeight(f.getPageHeight(), f.getUrl());
			},100);
		}
	};
	f.getUrl = function(){
		var _local = window.location,
			_pathname = _local.pathname.replace('/','');
		return _pathname;
	};
})();
$(function(){
	xes.iframe.setHeight();		
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
 * 初始化所有带有open_tabs样式的链接为tab方式打开，不带则用默认方式打开
 */
var initTabBtn = function(){
	var _btn = $('.open_tabs');
	_btn.die('click').live('click',function(){
		openTab(this);

		return false;
	});
}();

/* =-=-=-=-=-=-=-=-=-=-=-= xes.live.js =-=-=-=-=-=-=-=-=-=-=-=-= */

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
/* =-=-=-=-=-=-=-=-=-=-=-= ui/xes.ui.calendar.min.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * xes.ui.calendar.min.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

jQuery.fn.extend({calendar:function(J){function o(){$("#"+J.controlId).find(".tabD a").mouseup(function(){var e=new Date($("#"+J.controlId).find(".currentYear").text()+"/"+$("#"+J.controlId).find(".currentMonth").text()+"/1");if($(this).hasClass("prevD")){e.setMonth(e.getMonth()-1);e.setDate($(this).text());var c=J.speed;J.speed=0;$("#"+J.controlId).find(".prevMonth").triggerHandler("mouseup");J.speed=c}else{if($(this).hasClass("nextD")){e.setMonth(e.getMonth()+1);e.setDate($(this).text());c=J.speed;J.speed=0;$("#"+J.controlId).find(".nextMonth").triggerHandler("mouseup");J.speed=c}}var f=$(this).text();e=e.getFullYear()+"-"+(Number(e.getMonth()+1)<10?"0"+Number(e.getMonth()+1):Number(e.getMonth()+1))+"-"+(Number(f)<10?"0"+f:f);y.val(e);$("#"+J.controlId+" div table a").removeClass("select");$("#"+J.controlId+" .tabD a:contains('"+f+"')").each(function(){f==$(this).text()&&!$(this).hasClass("prevD")&&!$(this).hasClass("nextD")&&$(this).addClass("select")});$("#"+J.controlId).hide();J.callback();$(y).blur()}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})}function h(){$("#"+J.controlId).find(".tabM a").mouseup(function(){var c=j(Number($("#"+J.controlId).find(".currentYear").text()),Number($(this).attr("val")));l(c);o();$("#"+J.controlId).find(".currentMonth").text(Number($(this).attr("val"))+1)}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})}function d(){$("#"+J.controlId).find(".tabY a").mouseup(function(){var c=j(Number($(this).text()),Number($("#"+J.controlId).find(".currentMonth").text())-1);l(c);o();$("#"+J.controlId).find(".currentYear").text(Number($(this).text()))}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})}function j(A,w){newDate=new Date(A,w,1);newDate.setDate(0);var u=1,r=newDate.getDate();newDate.setDate(1);newDate.setMonth(newDate.getMonth()+1);var f=newDate.getDay();if(f==0){f=7}r=r-f+1;newDate.setMonth(newDate.getMonth()+1);newDate.setDate(0);var e=newDate.getDate(),s="<table class='tabD'>";s+="<tr><th>\u65e5</th><th>\u4e00</th><th>\u4e8c</th><th>\u4e09</th><th>\u56db</th><th>\u4e94</th><th>\u516d</th></tr>";var q=b(),k="",c="",B="";J.complement||(B="style='display:none'");for(var z=0;z<6;z++){s+="<tr>";for(var v=0;v<7;v++){var n=z*7+v+1-f;c=k="";if(J.lowerLimit!=NaN&&J.lowerLimit>new Date(newDate.getFullYear(),newDate.getMonth(),n)||J.upperLimit!=NaN&&new Date(newDate.getFullYear(),newDate.getMonth(),n)>J.upperLimit){if(0<n&&n<=e){if(newDate.getFullYear()==I&&newDate.getMonth()==H&&n==t){k="current"}s+="<td><span class='"+k+"'>"+n+"</span></td>"}else{if(n<=0){if(newDate.getFullYear()==I&&newDate.getMonth()-1==H&&r==t){k="current"}s+="<td><span class='"+k+"' "+B+">"+r+"</span></td>";r++}else{if(n>e){if(newDate.getFullYear()==I&&newDate.getMonth()+1==H&&u==t){k="current"}s+="<td><span class='"+k+"' "+B+">"+u+"</span></td>";u++}}}}else{if(0<n&&n<=e){if(newDate.getFullYear()==I&&newDate.getMonth()==H&&n==t){k="current"}if(newDate.getFullYear()==q.getFullYear()&&newDate.getMonth()==q.getMonth()&&n==q.getDate()){c="select"}s+="<td><a class='"+c+" "+k+"'>"+n+"</a></td>"}else{if(n<=0){if(newDate.getFullYear()==I&&newDate.getMonth()-1==H&&r==t){k="current"}if(newDate.getFullYear()==q.getFullYear()&&newDate.getMonth()-1==q.getMonth()&&r==q.getDate()){c="select"}s+="<td><a class='prevD "+c+" "+k+"' "+B+">"+r+"</a></td>";r++}else{if(n>e){if(newDate.getFullYear()==I&&newDate.getMonth()+1==H&&u==t){k="current"}if(newDate.getFullYear()==q.getFullYear()&&newDate.getMonth()+1==q.getMonth()&&u==q.getDate()){c="select"}s+="<td><a class='nextD "+c+" "+k+"' "+B+">"+u+"</a></td>";u++}}}}s=s.replace("class=' '","")}s+="</tr>"}s+="</table>";return s}function a(e){var c=b(),f="<table class='tabM'>";f+="<tr>";f+="<td><a val='0' "+(e==c.getFullYear()&&0==c.getMonth()?"class='select'":"")+" "+(e==I&&0==H?"class='current'":"")+">\u4e00\u6708</a></td>";f+="<td><a val='1' "+(e==c.getFullYear()&&1==c.getMonth()?"class='select'":"")+" "+(e==I&&1==H?"class='current'":"")+">\u4e8c\u6708</a></td>";f+="<td><a val='2' "+(e==c.getFullYear()&&2==c.getMonth()?"class='select'":"")+" "+(e==I&&2==H?"class='current'":"")+">\u4e09\u6708</a></td>";f+="<td><a val='3' "+(e==c.getFullYear()&&3==c.getMonth()?"class='select'":"")+" "+(e==I&&3==H?"class='current'":"")+">\u56db\u6708</a></td>";f+="</tr>";f+="<tr>";f+="<td><a val='4' "+(e==c.getFullYear()&&4==c.getMonth()?"class='select'":"")+" "+(e==I&&4==H?"class='current'":"")+">\u4e94\u6708</a></td>";f+="<td><a val='5' "+(e==c.getFullYear()&&5==c.getMonth()?"class='select'":"")+" "+(e==I&&5==H?"class='current'":"")+">\u516d\u6708</a></td>";f+="<td><a val='6' "+(e==c.getFullYear()&&6==c.getMonth()?"class='select'":"")+" "+(e==I&&6==H?"class='current'":"")+">\u4e03\u6708</a></td>";f+="<td><a val='7' "+(e==c.getFullYear()&&7==c.getMonth()?"class='select'":"")+" "+(e==I&&7==H?"class='current'":"")+">\u516b\u6708</a></td>";f+="</tr>";f+="<tr>";f+="<td><a val='8' "+(e==c.getFullYear()&&8==c.getMonth()?"class='select'":"")+" "+(e==I&&8==H?"class='current'":"")+">\u4e5d\u6708</a></td>";
f+="<td><a val='9' "+(e==c.getFullYear()&&9==c.getMonth()?"class='select'":"")+" "+(e==I&&9==H?"class='current'":"")+">\u5341\u6708</a></td>";f+="<td><a val='10' "+(e==c.getFullYear()&&10==c.getMonth()?"class='select'":"")+" "+(e==I&&10==H?"class='current'":"")+">\u5341\u4e00\u6708</a></td>";f+="<td><a val='11' "+(e==c.getFullYear()&&11==c.getMonth()?"class='select'":"")+" "+(e==I&&11==H?"class='current'":"")+">\u5341\u4e8c\u6708</a></td>";f+="</tr>";f+="</table>";return f}function x(f){f=Math.floor(f/10)*10;var e="<table class='tabY'>",s=b(),n="",c="",r="";J.complement||(r="style='display:none'");for(var q=0;q<3;q++){e+="<tr>";for(var k=0;k<4;k++){c=n="";if(q+1*k+1!=1&&(q+1)*(k+1)!=12){if(f==s.getFullYear()){n="select"}if(f==I){c="current"}e+="<td><a class='"+n+" "+c+"' >"+f+"</a></td>";f++}else{if(q+1*k+1==1){if(f-1==s.getFullYear()){n="select"}if(f-1==I){c="current"}e+="<td><a class='prevY "+n+" "+c+"' "+r+">"+(f-1)+"</a></td>"}else{if(f==s.getFullYear()){n="select"}if(f==I){c="current"}e+="<td><a class='nextY "+n+" "+c+"' "+r+">"+f+"</a></td>"}}}e+="</tr>"}e+="</table>";return e}function p(e){var c=$("#"+J.controlId).find(".reserve"),f=$("#"+J.controlId).find(".enabled");c.stop();f.stop();c.removeClass("reserve").addClass("enabled");f.removeClass("enabled").addClass("reserve");c.css({"margin-left":f.width()+"px","margin-top":"0px"});c.empty().append(e);c.animate({"margin-left":"0px"},J.speed);f.animate({"margin-left":"-"+f.width()+"px"},J.speed,function(){f.empty()})}function m(e){var c=$("#"+J.controlId).find(".reserve"),f=$("#"+J.controlId).find(".enabled");c.stop();f.stop();c.removeClass("reserve").addClass("enabled");f.removeClass("enabled").addClass("reserve");c.css({"margin-left":"-"+f.width()+"px","margin-top":"0px"});c.empty().append(e);c.animate({"margin-left":"0px"},J.speed);f.animate({"margin-left":f.width()+"px"},J.speed,function(){f.empty()})}function l(e){var c=$("#"+J.controlId).find(".reserve"),f=$("#"+J.controlId).find(".enabled");c.stop();f.stop();c.removeClass("reserve").addClass("enabled");f.removeClass("enabled").addClass("reserve");$("#"+J.controlId).css({"z-index":1});c.css({"z-index":-1});f.css({"z-index":-1});c.css({"margin-left":"0px","margin-top":f.height()+"px"});c.empty().append(e);c.animate({"margin-top":"0px"},J.speed);f.animate({"margin-top":"-"+f.width()+"px"},J.speed,function(){f.empty();$("#"+J.controlId).css({"z-index":0});c.css({"z-index":0});f.css({"z-index":0})})}function i(e){var c=$("#"+J.controlId).find(".reserve"),f=$("#"+J.controlId).find(".enabled");c.stop();f.stop();c.removeClass("reserve").addClass("enabled");f.removeClass("enabled").addClass("reserve");$("#"+J.controlId).css({"z-index":1});c.css({"z-index":-1});f.css({"z-index":-1});c.css({"margin-left":"0px","margin-top":"-"+f.height()+"px"});c.empty().append(e);c.animate({"margin-top":"0px"},J.speed);f.animate({"margin-top":f.width()+"px"},J.speed,function(){f.empty();$("#"+J.controlId).css({"z-index":0});c.css({"z-index":0});f.css({"z-index":0})})}function b(){re=/(\d\d\d\d)(\W)?(\d\d)(\W)?(\d\d)/g;var c=y.val();c=c.replace(re,"$1/$3/$5@").split("@")[0];return new Date(c)}function g(e){var c=[];c.x=e.offsetLeft;for(c.y=e.offsetTop;e=e.offsetParent;){c.x+=e.offsetLeft;c.y+=e.offsetTop}return c}J=jQuery.extend({controlId:$(this).attr("id")+"Calendar",speed:200,complement:true,readonly:true,upperLimit:NaN,lowerLimit:NaN,callback:function(){}},J||{});var y=$(this);if(J.readonly){y.attr("readonly",true);y.bind("keydown",function(){if(event.keyCode==8){event.keyCode=0}})}today=new Date;var I=today.getFullYear(),H=today.getMonth(),t=today.getDate(),G="";G+="<div id='"+J.controlId+"'class='calendar'>";G+="  <div class='calMain'>";G+="    <div class='calTitle'>";G+="      <a class='prevMonth'></a><span class='t_date'><span class='currentYearText'><a class='currentYear'>"+I+"</a>\u5e74</span><span class='currentMonthText'><a class='currentMonth'>"+(H+1)+"</a>\u6708</span></span><a class='nextMonth'></a>";G+="    </div>";G+="    <div class='calContent'>";G+="      <div class='reserve'>";G+="      </div>";G+="      <div class='enabled'>";G+=j(I,H);G+="      </div>";G+="    </div>";G+="  </div>";G+="</div>";$("body").append(G);o();$("#"+J.controlId).find(".prevMonth").mouseup(function(){if($("#"+J.controlId).find(".enabled > .tabD").length>0){var e=$("#"+J.controlId).find(".currentYear"),c=$("#"+J.controlId).find(".currentMonth"),f=j(Number(e.text()),Number(c.text())-2);m(f);if(Number(c.text())!=1){c.text(Number(c.text())-1)}else{e.text(Number(e.text())-1);c.text("12")}o()}else{if($("#"+J.controlId).find(".enabled > .tabM").length>0){f=a(Number($("#"+J.controlId).find(".currentYear").text())-1);m(f);h();$("#"+J.controlId).find(".currentYear").text(Number($("#"+J.controlId).find(".currentYear").text())-1)}else{if($("#"+J.controlId).find(".enabled > .tabY").length>0){f=x(Number($("#"+J.controlId).find(".currentYear").text())-10);m(f);d();$("#"+J.controlId).find(".currentYear").text(Number($("#"+J.controlId).find(".currentYear").text())-10)
}}}});$("#"+J.controlId).find(".nextMonth").mouseup(function(){if($("#"+J.controlId).find(".enabled > .tabD").length>0){var e=$("#"+J.controlId).find(".currentYear"),c=$("#"+J.controlId).find(".currentMonth"),f=j(Number(e.text()),Number(c.text()));p(f);if(Number(c.text())!=12){c.text(Number(c.text())+1)}else{e.text(Number(e.text())+1);c.text("1")}o()}else{if($("#"+J.controlId).find(".enabled > .tabM").length>0){f=a(Number($("#"+J.controlId).find(".currentYear").text())+1);p(f);h();$("#"+J.controlId).find(".currentYear").text(Number($("#"+J.controlId).find(".currentYear").text())+1)}else{if($("#"+J.controlId).find(".enabled > .tabY").length>0){f=x(Number($("#"+J.controlId).find(".currentYear").text())+10);p(f);d();$("#"+J.controlId).find(".currentYear").text(Number($("#"+J.controlId).find(".currentYear").text())+10)}}}});$("#"+J.controlId).find(".currentMonthText").mouseup(function(){if(!($("#"+J.controlId).find(".enabled > .tabM").length>0)){var c=a(Number($("#"+J.controlId).find(".currentYear").text()));i(c);h()}});$("#"+J.controlId).find(".currentYearText").mouseup(function(){if(!($("#"+J.controlId).find(".enabled > .tabY").length>0)){var c=x(Number($("#"+J.controlId).find(".currentYear").text()));i(c);d()}});y.bind("click focus",function(){if($("#"+J.controlId+":hidden").length!=0){$(".calendar").hide();var e=$("#"+J.controlId),c=g(y[0]),f=c.x;c=Number(y.offset().top)+Number(y.outerHeight());e.css({top:c+"px",left:f+"px"});f=$("#"+J.controlId).width();c=$("#"+J.controlId).height();e.width(0);e.height(0);e.show().animate({width:f+"px",height:c+"px"},J.speed);e.bind("selectstart",function(){return false}).bind("mousedown",function(){return false})}});$(document).mouseup(function(c){if($(c.target).attr("id")!=y.attr("id")&&($(c.target).parentsUntil("#"+J.controlId).parent().length==0||$(c.target).parentsUntil("#"+J.controlId).parent()[0].id!=J.controlId)){$("#"+J.controlId).hide()}})}});


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





