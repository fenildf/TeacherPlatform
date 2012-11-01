/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * UI.tabs
 * @update : 2012-10-29
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


var tabs = tabs || {};

(function(x, undefined){
	var t = tabs;
	t.id = 0;
	/*
	 * tab列表数据
	 *  id 		: 标签id
		title	: 标签文字
		content	: 标签对应的内容
		url 	: 标签目标url地址，存在的话，则用iframe调用
		fixed	: 固定选项：true（不可以关闭），默认是false
	 *
	 **/
	t.data = [
		{ 'id': '01', 'title': '首页', 'content': '', 'url': false, 'fixed': true },
		{ 'id': '02', 'title': 'menu1', 'content': '', 'url': false, 'fixed': true },
		{ 'id': '03', 'title': 'menu2', 'content': '', 'url': false, 'fixed': true },
		{ 'id': '04', 'title': 'menu3', 'content': '', 'url': false, 'fixed': false },
		{ 'id': '05', 'title': 'menu3', 'content': '', 'url': false, 'fixed': false },
		{ 'id': '06', 'title': 'menu4', 'content': '', 'url': false, 'fixed': false },
		{ 'id': '07', 'title': 'menu5', 'content': '', 'url': false, 'fixed': false },
		{ 'id': '08', 'title': 'menu6', 'content': '', 'url': false, 'fixed': false },

		{ 'id': '09', 'title': 'menu7', 'content': '', 'url': false, 'fixed': false }
	];

	//相关元素的cls，方便jQuery检索
	t.cls = {
		wrap : '.ui-tabs-wrap',
		last : '.ui-tabs-last',
		fixed : '.fixed',
		active : '.current'
	};

	//返回tabs的html结构
	t.getHtml = function(d){
		var _tpl = {
			target : d.url ? 'target="_content"' : '',
			url : d.url ? d.url : 'javascript:void(0);',
			title : d.title,
			close : d.fixed ? '' : '<span class="del_btn">删除</span>'
		};
		var _html = '<li><a "' + _tpl.target +'" href="' + _tpl.url + '">' + _tpl.title + '</a>' + _tpl.close + '</li>';
		return _html;
	};

	//监听事件
	t.listener = function(dom, event, fn){
		dom[event](function(){
			fn();
		});
	};

	/* 
	 * 创建tab元素 
	 * d = {title,};
	 */
	t.create = function(html){

	};

	/*
	 * 
	 */
	t.handleClick = function(){

	};




	// t = {
	// 	version: '1.0',
	// 	options: {
	// 		active : null,
	// 		event : 'click',
	// 		load : null,
	// 		before : null
	// 	},
		
	// 	_setOption  : function( event ){},
	// 	_create     : function(){},
	// 	_url        : function( index, url ){},
	// 	_length     : function(){},
	// 	_tabId      : function( a ){},
	// 	_getIndex   : function( index ){},
	// 	_findActive : function( selector ){},
	// 	_toggle     : function( event, eventData ){},

	// 	enable  : function( index ){},
	// 	disable : function( index ){},

	// 	add     : function( url, label, index ){},
	// 	remove  : function( index ){},
		
	// 	load    : function( index, event ){},
		
	// 	refresh : function(){},

	// 	select  : function( index ){},

	// };

})(xes);




xes.ui.add( 'tabs', tabs , function(tips){

});