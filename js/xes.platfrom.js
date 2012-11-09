/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 平台主JS
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

xes.platfrom = xes.platfrom || {};

(function(){
	var PF = xes.platfrom;

	PF.menu = PF.menu || {};
	/*
	 * 左侧导航切换
	 */
	PF.menu.toggle = function(){
		$('.sidebar .h2_menu_title').click(function(){
			var _handle = $(this),
				_content = _handle.next('.ui_fold_menu');
			_handle.addClass('current_title').siblings('.h2_menu_title').removeClass('current_title');
			_content.addClass('fold_current').siblings('.ui_fold_menu').removeClass('fold_current');
		});
		return this;
	};
	/*
	 * 左侧导航点击事件：tabs、content
	 */
	PF.menu.click = function(fn){
		$('.sidebar .ui_fold_menu li').click(function(){
			// alert($(this).text());
			fn(this);
		});
	};

})();


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
	}).listener(xes.ui.tabs.o.item,'click',function(d){
		alert($(d).text());
	});
	//tabs的点击事件
	xes.ui.tabs.o.wrap.find('li').die('click').live('click',function(){
		// alert($(this).text());
		xes.ui.tabs.click(this);
	});

	//关闭按钮的点击事件
	xes.ui.tabs.o.wrap.find('li span.del_btn').die('click').live('click',function(){
		xes.ui.tabs.close($(this).parent().attr('id').replace('tab_',''));
	});
});



xes.platfrom.menu.toggle().click(function(d){
	var _dom = $(d);
	// console.log(_dom.attr('fixed'));

	var _d = { 'id': _dom.attr('id'), 'title': _dom.text(), 'content': '', 'url': _dom.find('a').attr('url'), 'fixed': _dom.attr('fixed') };
	//根据左侧菜单创建tabs标签
	xes.ui.tabs.create(_d);
});
