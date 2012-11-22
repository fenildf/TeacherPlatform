/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/* 直播列表
 * live.list.js
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

/* =-=-=-=-=-=-=-=-=-=-=-= ui/xes.ui.select.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */
///import xes.base.js
///import xes.ui.js

/*
 * UI Select
 * UI组件：下拉列表
 * @update : 2012-10-26
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 * 
 * @namespace : xes.ui.select
 */




// function selector(msg){
// 	console.log(msg);
// }

var selector = selector || {};
(function(){
	var s = selector;
	s.config = {
		button : '.ui-select-button',
		list : '.ui-select-list',
		on : 'ui-select-hover',
		show : 'ui-select-show'
	};

	s.log = function(tips){console.log(this.parent)};
	
	/*
	 * 显示下拉层
	 * 根据button的value设置下拉列表中当前选中状态
	 */
	s.show = function(box){
		box.addClass(this.config.show);
		//以下为下拉列表中当前设置选中状态
		var _btn = box.prev(this.config.button),
			_val = _btn.val(),
			_txt = _btn.text(),
			_list = box.find('li');
		var _on = _list.find('input:hidden[value="' + _val + '"]').parent();
		_on.addClass(this.config.on).siblings().removeClass(this.config.on);
	};

	s.close = function(box){
		box.removeClass(this.config.show);

	};
	// 设置下拉框的定位及宽度
	s._setPosition = function(buttons){
		$(this.config.button).each(function(){
			var _w = $(this).outerWidth() -2,	
				_h = $(this).height(),
				_l = $(this).position().left,
				_t = $(this).position().top + _h + 1;

			$(this).next(s.config.list).css({
				width : _w,
				left : _l,
				top : _t
			});
		});
		return this;
	};
	//列表点击事件,可自定义也可默认
	s.check = function(list,fn){
		list.find('li').click(function(){
			s._setValue($(this));
		});
	};
	
	//设置选中的值
	s._setValue = function(item){
		var _btn = item.parent().prev(this.config.button),
			_val = item.find('input:hidden').val(),
			_txt = item.text();
		_btn.text(_txt).val(_val);
		this.close(item.parent());
	};
	
	
	s.btnClick = function(btn){
		
		btn.click(function(){
			//隐藏其他已打开的列表框
			s.close($(s.config.list));
			
			var _items = $(this).next(s.config.list);
			// s.show(_items);
			if(_items.hasClass(s.config.show)){
				s.close(_items);
			}else{
				s.show(_items);
				s.check(_items);
			}
		});
	};

	// -----------------------------------------------
	// s.hover = function(d){
	// 	$(this.config.button).hover(function(){
	// 		var _items = $(this).next(s.config.list);
	// 		s.show(_items);
	// 	},function(){
	// 		var _items = $(this).next(s.config.list);
	// 		_items.hover(function(){
	// 			s.show(_items);
	// 		},function(){
	// 			s.close(_items);				
	// 		});
	//
	// 	});
	// };
	// -----------------------------------------------

	s.init = function(){
		this._setPosition().btnClick($(this.config.button));
	};

})();



/* 注册到UI库 */
(function(xes){
	if(xes.ui){
		xes.ui.add('select',selector,function(msg){
			// console.log(msg);
			if(msg === 'ok'){
				xes.ui.select.init();
			}
		});
	}
})(xes);




/* =-=-=-=-=-=-=-=-=-=-=-= live_info.html =-=-=-=-=-=-=-=-=-=-=-=-= */

function liveCancel(liveId){
			alert('已取消');
		}