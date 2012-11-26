/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 学员筛选
 * student.leach.js
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

/* =-=-=-=-=-=-=-=-=-=-=-= student_leach.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function () {
	$("#startDate").calendar();
	$("#endDate").calendar();
});

$('#pages').change(function(){
	var _page = this.value;
	 $("#currpage").val(_page);
	 $("#listSerch").submit();
});
$(".ui_pages a").click(function(){
    _url = $(this).attr('href');
    _re = /curpage\:(\d+)$/;
    _page = _url.match(_re);
    if(_page!=null){
        $("#currpage").val(_page[1]);
        $(this).attr('href','###');
        $("#listSerch").submit();
    }
});