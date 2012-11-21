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
		// console.log(id);
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

		var _html = '<iframe id="content_' + id + '" name="content_' + id + '" width="100%" scrolling="no" height="100%" class="iframe_content ' + t.cls.main + '" src="' + url + '"></iframe>';
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