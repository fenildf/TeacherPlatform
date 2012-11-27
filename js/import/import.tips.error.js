/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 错误页面
 * tips.error.js
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

/* =-=-=-=-=-=-=-=-=-=-=-= xes.form.js =-=-=-=-=-=-=-=-=-=-=-=-= */
var xform=xform||{};(function(){var a=xform;a.checkAll=function(c){var b=$('input[type="checkbox"][id="checkAll"]').attr("checked");$.each($('input[type="checkbox"][id="'+c+'"]'),function(){$(this).attr("checked",b)})};a.checkAll2=function(c){var b=0;$.each($('input[type="checkbox"][id="'+c+'"]'),function(){if($(this).attr("checked")==false){$(this).attr("checked",true);b=1}});if(b==0){$.each($('input[type="checkbox"][id="'+c+'"]'),function(){$(this).attr("checked",false)})}};a.checkInverse=function(b){$.each($('input[type="checkbox"][id="'+b+'"]'),function(){$(this).attr("checked",$(this).attr("checked")?false:true)})};a.checkBoxes=function(b,c){$.each($('input[type="checkbox"][id="'+b+'"]'),function(){$(this).attr("checked",false)});$.each(c.split(","),function(d,e){$('input[type="checkbox"][id="'+b+'"][value="'+e+'"]').attr("checked",true)})};a.checkRadio=function(b,c){$('input[type="radio"][id="'+b+'"][value="'+c+'"]').attr("checked",true)};a.checkSelect=function(b,c){$('select[id="'+b+'"] option[value="'+c+'"]').attr("selected",true)};a.getCheckedValue=function(c){var b="";$.each($('input[name="'+c+'"]:checked'),function(){b=b+","+$(this).attr("value")});return b.slice(1)};a.getCheckedText=function(c){var b="";$.each($('input[name="'+c+'"]:checked'),function(){b=b+$(this).attr("title")});return b};a.getSelectedText=function(b){var c="";if($('select[id="'+b+'"] option:selected').attr("value")!=""){c=$('select[id="'+b+'"] option:selected').text()}return c};a.confirmDelete=function(c,b){if(confirm(c)){window.location.href=b}};a.tableCheckbox=function(d,c){if(c==""){c="checkvalue"}var b=$.cookie(c);if(b==null){b=","}$.each($("table[id="+d+'] tr input[type="checkbox"]'),function(){var e=b.indexOf(","+$(this).val()+",");if(e>=0){$(this).attr("checked",true)}});$("table[id="+d+'] tr input[type="checkbox"]').click(function(){var f=$(this).val();if($(this).attr("checked")===true){var e=b.indexOf(","+f+",");if(e==-1){b=b+f+","}$.cookie(c,b,{path:"/",expires:0})}if($(this).attr("checked")===false){var e=b.indexOf(","+f+",");if(e>=0){b=b.replace(","+f+",",",")}$.cookie(c,b,{path:"/",expires:0})}})}})();xes.form=xform;function generateMixed(e){var c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];var b="";for(var a=0;a<e;a++){var d=Math.ceil(Math.random()*35);b+=c[d]}return b};


/* =-=-=-=-=-=-=-=-=-=-=-= tips_error.html =-=-=-=-=-=-=-=-=-=-=-=-= */

var _btn = $('#error_btn');
console.log(history.go(-1));
if(history.length > 1) {
	_btn.text('返回');
} else {
	_btn.text('关闭');
}
_btn.click(function() {
	if(history.length > 1) {
		goback();
	} else {
		goback('close');
	}
});

function goback(tp) {
	var par = window.parent;
	if(tp == 'close') {
		if(par) {
			var _id = par.xes.ui.tabs.o.active.attr('id').replace('tab_', '');
			console.log(_id);
			par.xes.ui.tabs.close(_id);
		}
	} else {
		history.go(-1);
	}

}