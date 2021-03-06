/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 学习状体数据
 * data.study.status.js
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
	loaded();
	
	// setTimeout(function(){
	xes.iframe.setHeight();
	// },100);	
	
	/**
	 * 锚点跳转
	 * 如果url地址中存在锚点“#”则进行跳转
	 */
	var url = window.location.href;
	url = url.split('#');

	if(url.length > 1){
		// 去掉末尾的时间戳
		var n = url[1].split('?');
		n = n[0];
		goAnchor(n);
	}

})


/* =-=-=-=-=-=-=-=-=-=-=-=- 子页面调用父级方法 -=-=-=-=-=-=-=-=-=-=-=-=-= */
var checkLoading = function(){
	if(window.parent){
		window.parent.checkLoadings(arguments);
	}
};
var loading = function(dom, text){
	if(window.parent){
		// window.parent.loadings(arguments);
	}
};

var loaded = function(dom, text){
	if(window.parent){
		// window.parent.loadeds(arguments);		
	}
};

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
 * 关闭当前激活标签
 * @return {[type]} [description]
 */
var closeActiveTab = function(id){
	window.parent.closeActiveTabs(id);
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

		if(xes.img){
			xes.img.hideView();
		}
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

/**
 * 跳转到锚点
 * @param  {[type]} name 锚点id
 * @return {[type]}      [description]
 */
function goAnchor(name){
	var dom = $('#'+name);
	if(dom.length > 0){
		var top = dom.offset().top;
		window.parent.setScrollTop(top);
	}
}

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



/*
 * xes.ui.calendar.min.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */
 
jQuery.fn.extend({calendar:function(J){function o(){$("#"+J.controlId).find(".tabD a").mouseup(function(){var e=new Date($("#"+J.controlId).find(".currentYear").text()+"/"+$("#"+J.controlId).find(".currentMonth").text()+"/1");if($(this).hasClass("prevD")){e.setMonth(e.getMonth()-1);e.setDate($(this).text());var c=J.speed;J.speed=0;$("#"+J.controlId).find(".prevMonth").triggerHandler("mouseup");J.speed=c}else{if($(this).hasClass("nextD")){e.setMonth(e.getMonth()+1);e.setDate($(this).text());c=J.speed;J.speed=0;$("#"+J.controlId).find(".nextMonth").triggerHandler("mouseup");J.speed=c}}var f=$(this).text();e=e.getFullYear()+"-"+(Number(e.getMonth()+1)<10?"0"+Number(e.getMonth()+1):Number(e.getMonth()+1))+"-"+(Number(f)<10?"0"+f:f);y.val(e);$("#"+J.controlId+" div table a").removeClass("select");$("#"+J.controlId+" .tabD a:contains('"+f+"')").each(function(){f==$(this).text()&&!$(this).hasClass("prevD")&&!$(this).hasClass("nextD")&&$(this).addClass("select")});$("#"+J.controlId).hide();J.callback();$(y).blur()}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})}function h(){$("#"+J.controlId).find(".tabM a").mouseup(function(){var c=j(Number($("#"+J.controlId).find(".currentYear").text()),Number($(this).attr("val")));l(c);o();$("#"+J.controlId).find(".currentMonth").text(Number($(this).attr("val"))+1)}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})}function d(){$("#"+J.controlId).find(".tabY a").mouseup(function(){var c=j(Number($(this).text()),Number($("#"+J.controlId).find(".currentMonth").text())-1);l(c);o();$("#"+J.controlId).find(".currentYear").text(Number($(this).text()))}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})}function j(A,w){newDate=new Date(A,w,1);newDate.setDate(0);var u=1,r=newDate.getDate();newDate.setDate(1);newDate.setMonth(newDate.getMonth()+1);var f=newDate.getDay();if(f==0){f=7}r=r-f+1;newDate.setMonth(newDate.getMonth()+1);newDate.setDate(0);var e=newDate.getDate(),s="<table class='tabD'>";s+="<tr><th>\u65e5</th><th>\u4e00</th><th>\u4e8c</th><th>\u4e09</th><th>\u56db</th><th>\u4e94</th><th>\u516d</th></tr>";var q=b(),k="",c="",B="";J.complement||(B="style='display:none'");for(var z=0;z<6;z++){s+="<tr>";for(var v=0;v<7;v++){var n=z*7+v+1-f;c=k="";if(J.lowerLimit!=NaN&&J.lowerLimit>new Date(newDate.getFullYear(),newDate.getMonth(),n)||J.upperLimit!=NaN&&new Date(newDate.getFullYear(),newDate.getMonth(),n)>J.upperLimit){if(0<n&&n<=e){if(newDate.getFullYear()==I&&newDate.getMonth()==H&&n==t){k="current"}s+="<td><span class='"+k+"'>"+n+"</span></td>"}else{if(n<=0){if(newDate.getFullYear()==I&&newDate.getMonth()-1==H&&r==t){k="current"}s+="<td><span class='"+k+"' "+B+">"+r+"</span></td>";r++}else{if(n>e){if(newDate.getFullYear()==I&&newDate.getMonth()+1==H&&u==t){k="current"}s+="<td><span class='"+k+"' "+B+">"+u+"</span></td>";u++}}}}else{if(0<n&&n<=e){if(newDate.getFullYear()==I&&newDate.getMonth()==H&&n==t){k="current"}if(newDate.getFullYear()==q.getFullYear()&&newDate.getMonth()==q.getMonth()&&n==q.getDate()){c="select"}s+="<td><a class='"+c+" "+k+"'>"+n+"</a></td>"}else{if(n<=0){if(newDate.getFullYear()==I&&newDate.getMonth()-1==H&&r==t){k="current"}if(newDate.getFullYear()==q.getFullYear()&&newDate.getMonth()-1==q.getMonth()&&r==q.getDate()){c="select"}s+="<td><a class='prevD "+c+" "+k+"' "+B+">"+r+"</a></td>";r++}else{if(n>e){if(newDate.getFullYear()==I&&newDate.getMonth()+1==H&&u==t){k="current"}if(newDate.getFullYear()==q.getFullYear()&&newDate.getMonth()+1==q.getMonth()&&u==q.getDate()){c="select"}s+="<td><a class='nextD "+c+" "+k+"' "+B+">"+u+"</a></td>";u++}}}}s=s.replace("class=' '","")}s+="</tr>"}s+="</table>";return s}function a(e){var c=b(),f="<table class='tabM'>";f+="<tr>";f+="<td><a val='0' "+(e==c.getFullYear()&&0==c.getMonth()?"class='select'":"")+" "+(e==I&&0==H?"class='current'":"")+">\u4e00\u6708</a></td>";f+="<td><a val='1' "+(e==c.getFullYear()&&1==c.getMonth()?"class='select'":"")+" "+(e==I&&1==H?"class='current'":"")+">\u4e8c\u6708</a></td>";f+="<td><a val='2' "+(e==c.getFullYear()&&2==c.getMonth()?"class='select'":"")+" "+(e==I&&2==H?"class='current'":"")+">\u4e09\u6708</a></td>";f+="<td><a val='3' "+(e==c.getFullYear()&&3==c.getMonth()?"class='select'":"")+" "+(e==I&&3==H?"class='current'":"")+">\u56db\u6708</a></td>";f+="</tr>";f+="<tr>";f+="<td><a val='4' "+(e==c.getFullYear()&&4==c.getMonth()?"class='select'":"")+" "+(e==I&&4==H?"class='current'":"")+">\u4e94\u6708</a></td>";f+="<td><a val='5' "+(e==c.getFullYear()&&5==c.getMonth()?"class='select'":"")+" "+(e==I&&5==H?"class='current'":"")+">\u516d\u6708</a></td>";f+="<td><a val='6' "+(e==c.getFullYear()&&6==c.getMonth()?"class='select'":"")+" "+(e==I&&6==H?"class='current'":"")+">\u4e03\u6708</a></td>";f+="<td><a val='7' "+(e==c.getFullYear()&&7==c.getMonth()?"class='select'":"")+" "+(e==I&&7==H?"class='current'":"")+">\u516b\u6708</a></td>";f+="</tr>";f+="<tr>";f+="<td><a val='8' "+(e==c.getFullYear()&&8==c.getMonth()?"class='select'":"")+" "+(e==I&&8==H?"class='current'":"")+">\u4e5d\u6708</a></td>";
f+="<td><a val='9' "+(e==c.getFullYear()&&9==c.getMonth()?"class='select'":"")+" "+(e==I&&9==H?"class='current'":"")+">\u5341\u6708</a></td>";f+="<td><a val='10' "+(e==c.getFullYear()&&10==c.getMonth()?"class='select'":"")+" "+(e==I&&10==H?"class='current'":"")+">\u5341\u4e00\u6708</a></td>";f+="<td><a val='11' "+(e==c.getFullYear()&&11==c.getMonth()?"class='select'":"")+" "+(e==I&&11==H?"class='current'":"")+">\u5341\u4e8c\u6708</a></td>";f+="</tr>";f+="</table>";return f}function x(f){f=Math.floor(f/10)*10;var e="<table class='tabY'>",s=b(),n="",c="",r="";J.complement||(r="style='display:none'");for(var q=0;q<3;q++){e+="<tr>";for(var k=0;k<4;k++){c=n="";if(q+1*k+1!=1&&(q+1)*(k+1)!=12){if(f==s.getFullYear()){n="select"}if(f==I){c="current"}e+="<td><a class='"+n+" "+c+"' >"+f+"</a></td>";f++}else{if(q+1*k+1==1){if(f-1==s.getFullYear()){n="select"}if(f-1==I){c="current"}e+="<td><a class='prevY "+n+" "+c+"' "+r+">"+(f-1)+"</a></td>"}else{if(f==s.getFullYear()){n="select"}if(f==I){c="current"}e+="<td><a class='nextY "+n+" "+c+"' "+r+">"+f+"</a></td>"}}}e+="</tr>"}e+="</table>";return e}function p(e){var c=$("#"+J.controlId).find(".reserve"),f=$("#"+J.controlId).find(".enabled");c.stop();f.stop();c.removeClass("reserve").addClass("enabled");f.removeClass("enabled").addClass("reserve");c.css({"margin-left":f.width()+"px","margin-top":"0px"});c.empty().append(e);c.animate({"margin-left":"0px"},J.speed);f.animate({"margin-left":"-"+f.width()+"px"},J.speed,function(){f.empty()})}function m(e){var c=$("#"+J.controlId).find(".reserve"),f=$("#"+J.controlId).find(".enabled");c.stop();f.stop();c.removeClass("reserve").addClass("enabled");f.removeClass("enabled").addClass("reserve");c.css({"margin-left":"-"+f.width()+"px","margin-top":"0px"});c.empty().append(e);c.animate({"margin-left":"0px"},J.speed);f.animate({"margin-left":f.width()+"px"},J.speed,function(){f.empty()})}function l(e){var c=$("#"+J.controlId).find(".reserve"),f=$("#"+J.controlId).find(".enabled");c.stop();f.stop();c.removeClass("reserve").addClass("enabled");f.removeClass("enabled").addClass("reserve");$("#"+J.controlId).css({"z-index":1});c.css({"z-index":-1});f.css({"z-index":-1});c.css({"margin-left":"0px","margin-top":f.height()+"px"});c.empty().append(e);c.animate({"margin-top":"0px"},J.speed);f.animate({"margin-top":"-"+f.width()+"px"},J.speed,function(){f.empty();$("#"+J.controlId).css({"z-index":0});c.css({"z-index":0});f.css({"z-index":0})})}function i(e){var c=$("#"+J.controlId).find(".reserve"),f=$("#"+J.controlId).find(".enabled");c.stop();f.stop();c.removeClass("reserve").addClass("enabled");f.removeClass("enabled").addClass("reserve");$("#"+J.controlId).css({"z-index":1});c.css({"z-index":-1});f.css({"z-index":-1});c.css({"margin-left":"0px","margin-top":"-"+f.height()+"px"});c.empty().append(e);c.animate({"margin-top":"0px"},J.speed);f.animate({"margin-top":f.width()+"px"},J.speed,function(){f.empty();$("#"+J.controlId).css({"z-index":0});c.css({"z-index":0});f.css({"z-index":0})})}function b(){re=/(\d\d\d\d)(\W)?(\d\d)(\W)?(\d\d)/g;var c=y.val();c=c.replace(re,"$1/$3/$5@").split("@")[0];return new Date(c)}function g(e){var c=[];c.x=e.offsetLeft;for(c.y=e.offsetTop;e=e.offsetParent;){c.x+=e.offsetLeft;c.y+=e.offsetTop}return c}J=jQuery.extend({controlId:$(this).attr("id")+"Calendar",speed:200,complement:true,readonly:true,upperLimit:NaN,lowerLimit:NaN,callback:function(){}},J||{});var y=$(this);if(J.readonly){y.attr("readonly",true);y.bind("keydown",function(c){if(c.keyCode==8){$(this).val("")}})}today=new Date;var I=today.getFullYear(),H=today.getMonth(),t=today.getDate(),G="";G+="<div id='"+J.controlId+"'class='calendar'>";G+="  <div class='calMain'>";G+="    <div class='calTitle'>";G+="      <a class='prevMonth'></a><span class='t_date'><span class='currentYearText'><a class='currentYear'>"+I+"</a>\u5e74</span><span class='currentMonthText'><a class='currentMonth'>"+(H+1)+"</a>\u6708</span></span><a class='nextMonth'></a>";G+="    </div>";G+="    <div class='calContent'>";G+="      <div class='reserve'>";G+="      </div>";G+="      <div class='enabled'>";G+=j(I,H);G+="      </div>";G+="    </div>";G+="  </div>";G+="</div>";$("body").append(G);o();$("#"+J.controlId).find(".prevMonth").mouseup(function(){if($("#"+J.controlId).find(".enabled > .tabD").length>0){var e=$("#"+J.controlId).find(".currentYear"),c=$("#"+J.controlId).find(".currentMonth"),f=j(Number(e.text()),Number(c.text())-2);m(f);if(Number(c.text())!=1){c.text(Number(c.text())-1)}else{e.text(Number(e.text())-1);c.text("12")}o()}else{if($("#"+J.controlId).find(".enabled > .tabM").length>0){f=a(Number($("#"+J.controlId).find(".currentYear").text())-1);m(f);h();$("#"+J.controlId).find(".currentYear").text(Number($("#"+J.controlId).find(".currentYear").text())-1)}else{if($("#"+J.controlId).find(".enabled > .tabY").length>0){f=x(Number($("#"+J.controlId).find(".currentYear").text())-10);m(f);d();$("#"+J.controlId).find(".currentYear").text(Number($("#"+J.controlId).find(".currentYear").text())-10)
}}}});$("#"+J.controlId).find(".nextMonth").mouseup(function(){if($("#"+J.controlId).find(".enabled > .tabD").length>0){var e=$("#"+J.controlId).find(".currentYear"),c=$("#"+J.controlId).find(".currentMonth"),f=j(Number(e.text()),Number(c.text()));p(f);if(Number(c.text())!=12){c.text(Number(c.text())+1)}else{e.text(Number(e.text())+1);c.text("1")}o()}else{if($("#"+J.controlId).find(".enabled > .tabM").length>0){f=a(Number($("#"+J.controlId).find(".currentYear").text())+1);p(f);h();$("#"+J.controlId).find(".currentYear").text(Number($("#"+J.controlId).find(".currentYear").text())+1)}else{if($("#"+J.controlId).find(".enabled > .tabY").length>0){f=x(Number($("#"+J.controlId).find(".currentYear").text())+10);p(f);d();$("#"+J.controlId).find(".currentYear").text(Number($("#"+J.controlId).find(".currentYear").text())+10)}}}});$("#"+J.controlId).find(".currentMonthText").mouseup(function(){if(!($("#"+J.controlId).find(".enabled > .tabM").length>0)){var c=a(Number($("#"+J.controlId).find(".currentYear").text()));i(c);h()}});$("#"+J.controlId).find(".currentYearText").mouseup(function(){if(!($("#"+J.controlId).find(".enabled > .tabY").length>0)){var c=x(Number($("#"+J.controlId).find(".currentYear").text()));i(c);d()}});y.bind("click focus",function(){if($("#"+J.controlId+":hidden").length!=0){$(".calendar").hide();var e=$("#"+J.controlId),c=g(y[0]),f=c.x;c=Number(y.offset().top)+Number(y.outerHeight());e.css({top:c+"px",left:f+"px"});f=$("#"+J.controlId).width();c=$("#"+J.controlId).height();e.width(0);e.height(0);e.show().animate({width:f+"px",height:c+"px"},J.speed);e.bind("selectstart",function(){return false}).bind("mousedown",function(){return false})}});$(document).mouseup(function(c){if($(c.target).attr("id")!=y.attr("id")&&($(c.target).parentsUntil("#"+J.controlId).parent().length==0||$(c.target).parentsUntil("#"+J.controlId).parent()[0].id!=J.controlId)){$("#"+J.controlId).hide()}})}});

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
			// var ifChecked = $('input[type="checkbox"][id="checkAll"]').attr('checked');
			var ifChecked = $('input[type="checkbox"][id="checkAll"]')[0].checked;
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
				var checked = $(this).attr('checked');
				if(checked == false || checked == undefined) {
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
		* 获取相同name的input文本框的值,以逗号隔开
		* @example
		*			<input type="text" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="text" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="text" id="checkbox[]" name="checkbox[]" value="3" checked>
		*
		*			<a href="javascript:void(0);" onclick="alert(getCheckedValue('checkbox[]')); return false;">复选框选择</a>
		*
		* @param string cbs_ids 复选框id
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.getInputsValue = function (cbs_id) {
			var values = '';
			$.each($('input[name="' + cbs_id + '"]'), function() {
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

		/**
		 * 按钮不可点击状态
		 * @param  {选择符} expr 支持选择符或者jQuery对象
		 * @return {[type]}      按钮设置为不可点击状态，同时上面增加一个遮罩层
		 */
		f.disible = function(expr){
			var btn = $(expr);
			var dom = '<div class="btn_disible_mask"></div>';
			btn.attr({
				disible:true,
				readonly:true
			});
			$(dom).css({
				width: btn.outerWidth(true),
				height: btn.outerHeight(true),
				top: btn.offset().top,
				left: btn.offset().left,
				position:'absolute',
				// backgroundColor:'#000',
				zIndex:1000
			}).appendTo('body');

		};

		f.enable = function(expr){
			var btn = $(expr);
			var dom = $('.btn_disible_mask');
			btn.attr({
				disible:false,
				readonly:false
			});
			dom.remove();
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

/**
 * 设置知识树联动
 * @param {[type]} department_id [学部id]
 * @param {[type]} subject_id    [学科id]
 */
function setKnowledge(department_id,subject_id){
	if(knowledge_params){
		//修改学部
		if(department_id){
			knowledge_params['department_id'] = department_id;
		}
		//修改学科
		if(subject_id){
			knowledge_params['subject_id'] = subject_id;
		}
		//初始化
		if(initSelects){
			initSelects(knowledge_params);
		}
	}
}

/* -------------------- xes.search.js --------------------- */

/*
 * search表单相关操作
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


/**
 * 在提交表单之前，重置分页数为1
 */
$(function(){
    var submit = $('#listSerch input:submit');
    submit.mousedown(function(){
        $('#pages').val(1);
        $('#currpage').val(1);
        $('#listSerch')[0].onSubmit = false;
    });
    submit.mouseup(function(){
        $('#listSerch')[0].onSubmit = true;
    });
});

/* -------------------- xes.pages.js --------------------- */

/*
 * pages分页相关操作
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


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

/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function () {
	// $("#startDate").calendar();
	$("#dateTimes").calendar();

	var btns = $('#title,#content,#dateTimes');
	btns.each(function(){
		var _t = $(this).attr('id'),
			_tips = $(this).nextAll('.tips_'+_t);
		if(_tips.length == 0){
			$(this).after('<span class="tips tips_'+_t + '"></span>');
		}
		
	});
	btns.blur(function(){
		xes.formVerify.checkEmpty(this);
	});

	$('.btn_cancel').click(function(){
		closeActiveTab();
	});
});


//提交时检测表单
function checkMessageForm(){
	var inputs = $('#title,#content,#dateTimes');
	inputs.each(function(){
		xes.formVerify.checkEmpty(this);
	});

	if($('.tips_error').length > 0){
		return false;
	}else{
		return true;
	}
}

