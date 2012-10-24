
/**
 * X.U.E frameworks
 * X : xue	学而思基础库
 * U : UI	学而思UI库
 * E : extend	学而思扩展
 * Copyright 2012 Xueersi Inc. All rights reserved.
 */

var X, xes = X = xes || {version: "1.0.0"}; 

/**
 * 加载script文件
 * @param {String} 		url
 * @param {sting}		place: 加载文件的位置：head or body
 * @param {Function}	callback
 */
xes._loadScript = function(url, callback, isBody) {

	// 如果没有url则返回；
	if(!url) { return; }

	var _call = callback ? callback : function(){};

	// 检查是否存在函数，返回布尔值；
	var _isLoad = function() {
		var _scripts = document.getElementsByTagName('script');
		for(var i = 0, len = _scripts.length; i < len; i++) {
			if(_scripts[i].src.indexOf(url) > -1) {
				return true;
			}
		}
		return false;
	}();

	// 检测是否存在，不存在则加载，否则直接返回callback
	if(!_isLoad) {
		var script = document.createElement('script');
		script.type = 'text/javascript';

		if(script.readyState) {// IE
			script.onreadystatechange = function() {
				if(script.readyState == 'loaded' || script.readyState == 'complete') {
					script.onreadystatechange = null;
					_call(true);
				}
			};
		} else {
			script.onload = function() { _call(true); };
		}
		script.src = url;
		var _place = (isBody) ? 'body' : 'head';
		document.getElementsByTagName(_place)[0].appendChild(script);
	} else {
		_call(false);
	}
	return this;
};
/**
 * 主机域名：包括二级、三级域
 */
xes.domain = function(){
	var _host = document.location.host;
	//return (_host == '' || _host == '127.0.0.1' || _host == 'www.xes.com') ? 'www.xueersi.com' : _host;
	return ( (_host == '' || _host == 'bbs.xueersi.com' || _host == 'star.xueersi.com') ? 'www.xueersi.com' : _host );
}();
/*
 * 返回主机的顶级域名
 */
xes.host = function(){
	var _host = window.location.hostname, _dot = _host.split('.');
	// 如果非顶级域的话，取域名的后两位
	var _domain = (_dot.length > 2) ? (_dot[_dot.length -2] + '.' + _dot[_dot.length -1]) : _host;
	_domain = _domain == 'xes.com' ? 'xueersi.com' : _domain;
	return _domain;
}();

xes.path = {
	js : 'http://' + xes.domain + '/static/js/',
	css : 'http://' + xes.domain + '/static/css/',
	img : 'http://' + xes.domain + '/static/img/'
};

xes.load = false;
xes.timestamp = new Date().valueOf();
xes.isIE6 = /MSIE 6\./.test(navigator.userAgent) && !window.opera;
xes.ready = function(callback){
	if(callback){
		callback();
	}
	// xes._loadScript(xes.path.js + 'widget/xes.widget.LAB.js',function(s){
		// if(s){
			// xes.load = $LAB;
			// callback($LAB);
		// }
	// });	
};

/*
 * 加载xes.repeater.js
 */
xes.ready(function(load){	
	/*
	 * 加载基础块
	 * 必须放到 xes.ready 函数种调用
	 */
	xes.app = xes.app || {};
	xes._loadScript(xes.path.js + 'xes.header.js');
	var _loc = window.location;
	if(_loc.pathname =='/' && _loc.hostname != 'star.xueersi.com' && _loc.hostname != 'bbs.xueersi.com'){
			var FD_NAME='xesindex';
			var _JSPath = xes.path.js;
			xes._loadScript(_JSPath + 'import/xes.import.index.js');
	}
	if(_loc.hostname != 'bbs.xueersi.com'){
		xes._loadScript(xes.path.js + 'app/xes.app.userAutoComplete.js',function(){
			// if(!xes.userAutoComplete.opt.isLoad){
			userAutoCompleteOnload();
			// }
		});
	}
	// 加载统计代码
	window.onload = function(){
		xes._loadScript(xes.path.js + 'widget/xes.widget.log.js'); 
	};

});
/* /////////////////////////// */
function hits(id){
	return false;
}
var _gaq = _gaq || [];