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
			// setTimeout(function(){
				// _setHeight(f.getPageHeight(), f.getUrl());
			// },100);
			_setHeight();
		}
	};
	f.getUrl = function(){
		var _local = window.location,
			// _pathname = _local.pathname.replace('/','');
			_pathname = _local.pathname;
		return _pathname;
	};
})();
$(function(){

	// setTimeout(function(){
		xes.iframe.setHeight();
	// },100);
	// if(window.parent){
	// 	//增加backspace按键返回操作
	// 	$('body').keyup(function(e){
	// 		// window.parent.goBack(e);
	// 		// var code = e.keyCode;
	// 		// if(code == 8){
	// 		// 	xes.ui.tabs.backHistory(function(){
	// 		// 		setIframeHeight();
	// 		// 	});
	// 		// }
	// 	});
	// }
	
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
 * 打开标签（表单提交），非链接点击时
 */
var goTab = function(url, title, id, closeSelf){
	if(closeSelf){
		window.parent.getActiveTabs(function(self){
			var closeID = self.attr('id');
			closeID = closeID.replace('tab_','');
			// window.parent.closeActiveTabs(_id);
			window.parent.goTabs(url, title, id, closeID);
		});

		
	}
}
/**
 * 刷新标签
 */
var refreshTab = function(id){
	window.parent.refreshTabs(id);
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
