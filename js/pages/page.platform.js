
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */



///import:ui/xes.ui.select.js///

///import:ui/xes.ui.tabs.js///

///import:xes.platform.js///


/* =-=-=-=-=-=-=-=-=-=-=-= platform.html =-=-=-=-=-=-=-=-=-=-=-=-= */

/**
 * sidebar
 */
// xes.platfrom.menu.create(xes.platfrom.menu.path).toggle().click();
xes.platfrom.menu.toggle().click();
xes.platfrom.tips();
/*
 * 将tabs注册到xes对象中
 */
xes.ui.add( 'tabs', tabs , function(tips){
	xes.ui.tabs.setting({
		item : $('.ui-tabs-items li'),
		wrap : $('.ui-tabs-items'),
		last : $('.ui-tabs-items li:last'),
		handle : $('.ui_fold_menu li a'),
		fixed : $('.ui-tabs-items li'),
		index : 0,
		main : $('.mainbody').children(),
		mainWrap : $('.mainbody')
	});
});

$(function(){
	//tabs的点击事件
	$('.ui-tabs-items').find('li a').die('click').live('click',function(){
		// alert($(this).text());
		xes.ui.tabs.click($(this).parent()[0]);
		//根据点击的url获取左侧当前激活的dom
		var _node = $('#sidebar li a[url="' + $(this).attr('url') + '"]');
		_dom = _node ? _node.parent() : false;
		xes.platfrom.menu.setActive(_dom);
	});

	//关闭按钮的点击事件
	$('.ui-tabs-items').find('li span.del_btn').die('click').live('click',function(){
		xes.ui.tabs.close($(this).parent().attr('id').replace('tab_',''), function(d){
			//回调函数，用于设置左侧当前激活状态
			var _node = $('#sidebar li a[url="' + d.attr('url') + '"]');
			_dom = _node ? _node.parent() : false;
			xes.platfrom.menu.setActive(_dom);
		});
		
	});

	$('#headSearch_submit').click(function(){
		var tp = $('#headSearch_type').val(),
			vl = $('#headSearch_value');
		var url = tp == '课程' ? 'course_list.html' : 'student.html',
			tit = tp + '列表',
			id = tp == '课程' ? 'menu_1_1_1' : 'menu_3_3_1'; 
		openTabs(url, tit, id);
	});
	$('#headSearch_select').find('li a').click(function(){
		$('#headSearch_type').val($(this).text());
	});


});

/** ============================ 下面是提供给子页面调用的函数 window.parent ========================== **/

var setIframeHeight = xes.platfrom.setMainHeight;

/**
 * 公用创建标签的方法
 * obj = {id,title,content,url,fixed}
 * 如果在sidebar中已经存在的了，则直接调用
 */
var createTabs = function(obj){
	var _menu = $('#sidebar ul.ui_fold_menu li').find('a[url="' + obj.url + '"]');
	if(_menu.length >0 && (_menu.parent().attr('id') == obj.id)){
		_menu.parent().click();
	}else{
		//根据左侧菜单创建tabs标签
		xes.ui.tabs.create(obj);
	}	
};


/**
 * 创建标签
 * @Example:
	<a id="menu_2_2_2" title="创建直播" href="javascript:void(0);" url="live_edit.html" onclick="openTabs(this);">创建直播</a>
 * @Mark:
 	如果是a标签调用：openTabs(this);
 	如果是直接传值调用：openTabs(false, '标签的标题', 'url.html');
   @param dom : 可以是dom对象，也可以是url路径；
   @param text: 如果第一个参数是url，则第二个是标签的标题
 */
var openTabs = function(dom, text, id){
	var _arg = arguments;
	if(_arg.length > 0){
		var _url,_text,_id,_content;
		//如果传入的是dom对象，则获取对应的属性
		if(typeof _arg[0] == 'object'){
			var _dom = $(_arg[0]);
			_url = _dom.attr('url') || _dom.attr('href');
			_id = _dom.attr('id');
			_content = _dom.attr('title');
			_text = _dom.attr('text') || _dom.text();
		}else{
			_url = _arg[0];
			_text = _arg[1] || '标签';
			_id = _arg[2];
		}
		_content = _content || _text;
		_id = _id || 'page_' + xes.timestamp;
		_url = _url || '404.html';
	}
	var _d = { 'id': _id, 'title': _text, 'content': _content, 'url': _url, 'fixed': false};

	createTabs(_d);

};
