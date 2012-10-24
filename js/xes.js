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
// 文件路径
xes.path = {
	js : 'http://' + xes.domain + '/static/js/',
	css : 'http://' + xes.domain + '/static/css/',
	img : 'http://' + xes.domain + '/static/img/'
};





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






