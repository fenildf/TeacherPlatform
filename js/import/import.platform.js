
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */



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
			if(msg === 'ok'){
				xes.ui.select.init();
			}
		});
	}
})(xes);





/*-=-=-=-=-=-=-=-=-=-=-=- xes.ui.tabs.js -=-=-=-=-=-=-=-=-=-=-=-=-=-*/
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
/**
 * Example: list

 			<li class="grade ui-select-box" >
				<button name="" value="" class="ui-select-button">年级</button>
				<ul class="ui-select-list">
					<li><a href="###">一年级</a></li>
					<li><a href="###">一年级</a></li>
					<li><a href="###">一年级</a></li>
					<li><a href="###">一年级</a></li>
					<li><a href="###">一年级</a></li>
				</ul>
			</li>
	pages:
	<li class="page_list ui-select-box">
	<button name="" class="ui-select-button">1/24</button>
				<ul class="ui-select-list ui-select-default ui-select-topborder">
					<li>
						<a href="###">1/24</a>
						<input type="hidden" value="1" />
					</li>
					<li>
						<a href="###">2/24</a>
						<input type="hidden" value="2" />
					</li>
					<li>
						<a href="###">3/24</a>
						<input type="hidden" value="3" />
					</li>
					<li>
						<a href="###">4/24</a>
						<input type="hidden" value="4" />
					</li>
					<li>
						<a href="###">5/242</a>
						<input type="hidden" value="5" />
					</li>
				</ul>
	</li>
 */

var tabs = tabs || {};

(function(x, undefined){
	var t = tabs;
	t.id = 0;

	//相关元素的cls，方便jQuery检索
	t.cls = {
		wrap : 'ui-tabs-wrap',
		last : 'ui-tabs-last',
		items : 'ui-tabs-items',
		fixed : 'fixed',
		active : 'current',
		main : 'ui-tabs-main-item',
		mainWrap : 'ui-tabs-main-items'
	};

	t.o = {
		item : '',
		wrap : '',
		last : '',
		fixed: '',
		active: '',
		handle:'',
		content: '',
		contentWrap : ''
	};

	/*
	 * 当前激活的标签索引
	 */
	t.index = 0;

	//上次激活的标签索引
	t.old = 0;


	/*
	 * 基础设置
	 * 主要设置t.o里面的对象
	 */
	t.setting = function(config){
		config.wrap.addClass(t.cls.items);
		config.last.addClass(t.cls.last);
		config.fixed.addClass(t.cls.fixed);
		config.main.addClass(t.cls.main);
		config.mainWrap.addClass(t.cls.mainWrap);

		t.o = {
			wrap : $('.' + t.cls.items),
			item : $('.' + t.cls.items).find('li'),
			last : $('.' + t.cls.last),
			content: $('.' + t.cls.main),
			contentWrap : $('.' + t.cls.mainWrap)
		};
		//给固定标签设置样式
		t.o.fixed = t.o.wrap.find('li.' + t.cls.fixed);

		//设置当前激活状态
		t.setActive(config.index || t.index);
		return this;
	};

	/*
	 * 返回tabs的html结构
	 * d = { 'id': '03', 'title': 'menu2', 'content': '', 'url': false, 'fixed': true };
	 * 如何有url则在_content框架内显示url目标链接内容，否则直接在
	 */
	t.getHtml = function(d){
		var _tpl = {
			id : d.id || new Date().getTime(),
			target : d.url ? 'target="content_' + d.id + '"' : '',
			url : d.url ? d.url : 'javascript:void(0);',
			title : d.title,
			content : d.content || d.title,
			close : d.fixed == 1 ? '' : '<span class="del_btn" title="删除标签">删除</span>',
			fixed : d.fixed == 1 ? 'fixed' : ''
		};
		var _html = '<li id="tab_' + _tpl.id + '" class="' + _tpl.fixed + '" title="' + _tpl.content + '" url="' + _tpl.url + '"><a ' + _tpl.target +' href="javascript:void(0);" url="' + _tpl.url + '" title="' + _tpl.content + '">' + _tpl.title + '</a>' + _tpl.close + '</li>';
		return _html;
	};


	/* 
	 * 创建tab元素 
	 * d = { 'id': '03', 'title': 'menu2', 'content': '', 'url': false, 'fixed': true };
	 */
	t.create = function(d){
		var _D = d || { 'id': '03', 'title': 'menu2', 'content': '', 'url': false, 'fixed': true };
		var _item = t.getItem(_D.id);
		//如果存在则直接执行该标签的点击事件，否则创建该菜单
		if(!_item){
			t.o.wrap.append(t.getHtml(_D));
		}

		t.click(t.getItem(_D.id)[0]);
		this.resize();
	};

	/**
	 * 根据id返回节点内容 与之前的t.isExist方法相同
	 * 检查tab是否已经存在
	 * 如果存在则返回此对象，否则返回false
	 */
	t.getItem = function(id){
		var _tab = t.o.wrap.find('li#tab_'+id);
		return (_tab.length > 0 ? _tab : false);
	};

	/**
	 * 根据元素获取索引值
	 */
	t.getIndex = function(d){
		var _index = t.o.wrap.find('li').index(d);
		return _index;
	};
	/**
	 * 获取最后一个节点
	 * 如果getID存在则返回最后一个节点的ID，否则返回DOM
	 */
	t.getLast = function(getID){
		var _last = t.o.wrap.find('li:last');
		return (getID ? _last.attr('id').replace('tab_','') : _last);
	};

	/*
	 * 标签的点击事件
	 */
	t.click = function(d){
		var _index = this.getIndex(d);
		var _id = $(d).attr('id');
		if(_id){
			_id = _id.replace('tab_','');
		}
		var _url = $(d).attr('url');
		t.setActive(_index);
		t.setContent(_id, _url);
	};

	/*
	 * 关闭标签
	 */
	t.close = function(id, fn){
		var _tab = t.getItem(id);
		
		if(_tab){
			t.remove(id);
			//如果关闭的标签为激活标签，则关闭后激活最后一个标签；否则不执行激活操作
			if(_tab.hasClass(t.cls.active)){
				t.click(t.getLast()[0]);
			}
		}
		this.resize();
		//如果有回调函数，则返回最后激活的标签
		if(fn){
			fn(t.o.wrap.find('li.'+t.cls.active));
		}
	};

	/*
	 * 设置激活标签
	 * 如果不传值则最后一个激活
	 */
	t.setActive = function(index){
		var _act = index >= 0 ? t.o.wrap.find('li').eq(index) : t.o.wrap.find('li:last');
		var _index = t.getIndex(_act[0]);
		// t.setOld();
		t.index = _index;
		//把激活的标签存入到t.o对象中
		t.o.active = _act;
		t.o.active.addClass(t.cls.active).siblings('li').removeClass(t.cls.active);
	};

	/**
	 * 设置之前激活的标签
	 */
	// t.setOld = function(index){
	// 	// console.log('o: ' + t.old);
	// 	t.old = index ? index : t.getIndex(t.o.wrap.find('li.' + t.cls.active)[0]);
	// 	// console.log('-------------');
	// 	// console.log('n: ' + t.old);
	// };

	/*
	 * 设置当前要显示的content内容(还未在页面中存在的内容)
	 */
	t.setContent = function(id,url){

		var _html = '<iframe id="content_' + id + '" name="content_' + id + '" frameborder="no" allowtransparency="yes" width="100%" scrolling="no" height="100%" class="iframe_content ' + t.cls.main + '" src="' + url + '"></iframe>';
		var _is = t.o.contentWrap.find('#content_'+id);

		if(_is.length == 0){
			t.o.contentWrap.append(_html);
		}
		t.contentShow(id);
	};

	/**
	 * 移出标签
	 */
	t.remove = function(id){
		t.o.wrap.find('li#tab_' + id).remove();
		t.o.contentWrap.find('#content_'+ id).remove();
	};

	/*
	 * 标签切换
	 	主要分为url方式切换，和直接替换内容的切换
	 	当点击标签的时候则在content里面追加对应的iframe，如果存在则直接显示，其他的隐藏起来；否则就添加新的iframe

	 	s:之前的标签
	 	e:当前要激活的标签
	 */

	t.toggle = function(s,e){
		t.index = t.o.item.index(e[0]);
		var sID = s.attr('id').replace('tab_'),
			eID = e.attr('id').replace('tab_');
		t.setActive(t.index);
		// 当前标签对应的content显示，其他content隐藏起来		
		t.contentShow(eID);
	};


	/**
	 * 设置tab的宽度
	 */
	t.resize = function(){
		var _wrap = this.o.wrap,
			_item = this.o.wrap.find('li'),
			_box = _item.find('a');

		var _width = 0;
		_box.removeAttr('style');
		_item.each(function(i){
			_width += $(this).outerWidth();
		});

		if(_wrap.width() < _width){
			var _w = _wrap.width() / _item.length - 51;
			_box.width(_w);
		}else{
			_box.removeAttr('style');
		}
	};

	/*
	 * 内容区域切换
	 	是否做出接口方式：把内容切换做成单独的接口，当tab切换（或左侧菜单点击，或其他方法直接调用）的时候直接传参数给此接口

	 */
	t.contentToggle = function(){};

	/*
	 * 显示已存在的content内容
	 */
	t.contentShow = function(id){
		var _ID = id || t.o.active.attr('id').replace('tab_');
		var _iframe = t.o.contentWrap.find('#content_' + _ID);
		// 当前标签对应的content显示，其他content隐藏起来
		_iframe.show().siblings('.' + t.cls.main).hide();
		//设置content高度（切换的时候有用）
		$('#content').height(_iframe.height());
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

	//监听事件
	t.listener = function(dom, event, fn){
		dom.die(event).live(event,function(){
			fn(this);
		});
	};

})(xes);


/*
 * 下面注册方法需要放到主JS中
 */

// xes.ui.add( 'tabs', tabs , function(tips){
// 	xes.ui.tabs.setting({
// 		item : $('.ui_nav_all li'),
// 		wrap : $('.ui_nav_all'),
// 		last : $('.ui_nav_all li:last'),
// 		handle : $('.ui_fold_menu li a'),
// 		fixed : $('.ui_nav_all li'),
// 		index : 0,
// 		main : $('.mainbody').child(),
// 		mainWrap : $('.mainbody')
// 	});
// });


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

	/**
	 * input表单提示
	 */
	PF.tips = function(){
		$("input.input_text_ui").focus(function() {
	        if ($(this).val() == this.defaultValue) {
	            $(this).val("");
	        }
	    }).blur(function() {
	        if ($(this).val() == '') {
	            $(this).val(this.defaultValue);
	        }
	    });
	};

	PF.menu = PF.menu || {};
	/**
	 * 根据data遍历生成左侧菜单树
	 */
	PF.menu.create = function(data){
		var _data = data || PF.path;
		var _wrap = $('.sidebar');

		$.each(_data, function(m, n){
			var _h2 = '<h2 id="sidemenu_'+ n.id +'" class="h2_menu_title">' + n.name + '</h2>\n',
				_ul = '<ul id="menu_'+ n.id +'" class="ui_fold_menu">\n';
			var _items = n.items;
			// each child node
			if(_items.length > 0){
				for(var i = 0, len = _items.length; i < len; i++){
					var _d = _items[i],
					_url = _d.url ? 'url="' + _d.url + '"' : '',
					_fixed = _d.fixed ? '1' : '0',
					_title = _d.title ? _d.title : _d.name;

					_ul += '<li id="menu_'+ n.id +'_'+ _d.id+'" fixed="' + _fixed + '"> <a title="' + _title + '" href="javascript:void(0);"' + _url + '>' + _d.name + '</a></li>\n';
				}
			}
			_ul += '</ul>\n';

			var _node = _wrap.find('#sidemenu_'+ n.id);
			if(_node.length > 0){
				_node.text(n.name);
				_node.next('ul').remove();
				_node.after(_ul);
			}else{
				_wrap.append(_h2 + _ul);
			}
		});
		return this;
	};
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
	PF.menu.click = function(dom){

		$('.sidebar .ui_fold_menu li').die('click').live('click',function(){
			// alert($(this).text());
			// fn(this);
			var _dom = $(this);
			var _d = { 'id': _dom.attr('id'), 'title': _dom.text(), 'content': '', 'url': _dom.find('a').attr('url'), 'fixed': _dom.attr('fixed') };
			//根据左侧菜单创建tabs标签
			xes.ui.tabs.create(_d);	
			PF.menu.setActive(this);
		});
	};

	/**
	 * 左侧导航设置当前状态
	 * 传入子节点，同时根据子节点设置父节点的当前状态
	 */
	PF.menu.setActive = function(dom){
		$('#sidebar li').removeClass('current');
		//如果左侧有则激活，否则折叠左侧
		if(dom){
			$(dom).addClass('current');
			$(dom).parent().prev().click();
		}else{

		}
	};
	

	/**
	 * 左侧地址列表
	 */
	PF.path = [{
		id: '1',
		name: '我的课程',
		title: '',
		url: '',
		items: [{
			id: '1_1',
			name: '课程列表',
			title: '',
			url: '/course_list.html',
			items: [],
			fixed: false
		}]
	}, {
		id: '2',
		name: '服务管理',
		title: '',
		url: '',
		items: [{
			id: '2_1',
			name: '直播列表',
			title: '',
			url: '/live_list.html',
			items: [],
			fixed: false
		}, {
			id: '2_2',
			name: '创建直播',
			title: '',
			url: '/live_edit.html',
			items: [],
			fixed: false
		}, {
			id: '2_3',
			name: '筛选学员',
			title: '',
			url: '/student_leach.html',
			items: [],
			fixed: false
		}]
	}, {
		id: '3',
		name: '我的学员',
		title: '',
		url: '',
		items: [{
			id: '3_1',
			name: '学员列表',
			title: '',
			url: '/student.html',
			items: [],
			fixed: false
		}]
	},
	// {id:'4', name:'资料管理', title:'', url:'', items:[]},
	{
		id: '5',
		name: '数据分析',
		title: '',
		url: '',
		items: [{
			id: '5_1',
			name: '学习状态数据',
			title: '',
			url: '/data1_list.html',
			items: [],
			fixed: false
		}, {
			id: '5_2',
			name: '学完率数据',
			title: '',
			url: '/data2.html',
			items: [],
			fixed: false
		}, {
			id: '5_3',
			name: '学习效果数据',
			title: '',
			url: '/data3_list.html',
			items: [],
			fixed: false
		}]
	}];

	/**
	 * 设置iframe高度(内部页面加载时调用)
	 */
	PF.setMainHeight = function(h, url){
		var _headHeight = 108,
			_footHeight = 85,
			_winHeight = $(window).height();
		var _mainMinHeight = _winHeight - _headHeight - _footHeight;
		var _height = (h+31 < _mainMinHeight) ? _mainMinHeight -41 : h + 20;
		// _height += 10;
		$('#content').height(_height);
		if(url){

			var _ifr = $('#content').find('iframe[src="' + url + '"]'),
				_h = _ifr.contents().outerHeight();

				_ifr.height(_h);
			// console.log(_ifr.contents().height());
			// $('#content').find('iframe[src="' + url + '"]').height(_height);
			// $('#content').find('iframe[src="' + url + '"]').attr('height',_height);
		}
	};


})();




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
/**
 * 表单提交打开标签
 */
var goTabs = function(url, title, id, closeID){
	var _arg = arguments;
	var _url,_text,_id,_content;
		_url = _arg[0];
		_text = _arg[1] || '标签';
		_id = _arg[2];
		_content = _content || _text;
		_id = _id || 'page_' + xes.timestamp;
		_url = _url || '404.html';

	var _d = { 'id': _id, 'title': _text, 'content': _content, 'url': _url, 'fixed': false};

	

	if(closeID){
		closeActiveTabs(closeID);
	}
	createTabs(_d);
};

var closeActiveTabs = function(id){
	var _tab = $('.ui-tabs-items').find('#tab_'+id);
	var _con = $('#content_'+id);
	_tab.find('span.del_btn').click();
	_con.hide();
};
/**
 * 获取当前激活标签
 */
var getActiveTabs = function(fn){
	var tab = xes.ui.tabs.o.active;
	if(fn){
		fn(tab);
	}else{
		return tab;
	}
	
};