/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * xes.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var X, xes = X = xes || {};

// 主机域名：包括二级、三级域
xes.domain = function(){
	var _host = document.location.host;
	return (_host == '' || _host == '127.0.0.1' || _host == 'www.xes.com') ? 'www.xueersi.com' : _host;
	// return ( (_host == '' || _host == 'bbs.xueersi.com' || _host == 'star.xueersi.com') ? 'www.xueersi.com' : _host );
}();

xes.timestamp = new Date().valueOf();

// 文件路径
xes.path = {
	js : 'http://' + xes.domain + '/static/js/',
	css : 'http://' + xes.domain + '/static/css/',
	img : 'http://' + xes.domain + '/static/img/'
};



// 将组件注册到xes中
xes.register = function(app, callback){};

// 常用事件的封装
xes.event = xes.event || {};
// 操作dom
xes.dom = xes.dom || {};
// 页面元素，如宽高等
xes.page = xes.page || {};
// 对json的一些方法
xes.json = xes.json || {};
// 对字符串的一些操作
xes.string = xes.string || {};
// 方法扩展
xes.fn = xes.fn || {};
// 扩展接口
xes.extend = xes.extend || {};
/* ----------------------------------------- */
// 对日期的一些操作
xes.date = xes.date || {};
// 和表单相关的验证
xes.form = xes.form || {};
// 对URL的一些操作
xes.url = xes.url || {};
// 对flash封装的一些操作
xes.flash = xes.flash || {};
/* ----------------------------------------- */
// 浏览器检测
xes.browser = xes.browser || {};
// cookie操作
xes.cookie = xes.cookie || {};
// 对ajax的一些封装
xes.ajax = xes.ajax || {};
/* ----------------------------------------- */
// 封装的动画效果
xes.fx = xes.fx || {};
// 页面中的ui组件
xes.ui = xes.ui || {};
// 应用扩展
xes.app = xes.app || {};
// 模块化接口封装
xes.widget = xes.widget || {};
/* ----------------------------------------- */
// 工具组件
xes.tools = xes.tools || {};
// 对外部的api接口
xes.api = xes.api || {};



/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * xes ui 
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */
xes.ui = xes.ui || {};

/*
 * app register
 * 注册到ui组件库中
 * @Marks : 采用松散的编写方式，开发人员可以根据自己的书写习惯进行脚本编写；
 			之后如果需要用到xesui库中的资源，则需要进行注册；
 			如果注册的话，需要按照手册中提供的格式进行代码的编写。
 			
 * @namespace : xes.ui.add
 * @author : Wu Jie (Marco)
 * @update : 2012-10-26
 *
 * @param : name {string} 应用名称
 * @param : fn {Object/function} 应用方法
 * @param : callback {string} 注册结果：ok / error（返回error的原因，暂时只判断是否已经存在，以后会提供更多判断）
 * @example :
	xes.ui.add('simple',simpleApp,function(msg){
		if(msg === 'ok'){
			xes.ui.simple('Success: Applications Registered!')
		}else{
			console.log(msg);
		}
	});

	function simpleApp(tips){
		console.log(tips)
	}
**/


xes.ui.add = function(name, obj, callback){
	if(xes.ui[name]){
		callback('Error: This application already exists!');
	}else{
		xes.ui[name] = obj;
		callback('ok');
	}
};


/* Example:
 * 
 *  xes.widget('ui.tabs',{
		a:'',
		b:'',
		c:function(){}
 	});
 *
 *
 *
**/
// xes.widget = function(uiname, obj, obj){

// };





