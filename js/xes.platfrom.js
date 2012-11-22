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
			url: 'course_list.html',
			items: [],
			fixed: true
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
			url: 'live_list.html',
			items: [],
			fixed: true
		}, {
			id: '2_2',
			name: '创建直播',
			title: '',
			url: 'live_edit.html',
			items: [],
			fixed: false
		}, {
			id: '2_3',
			name: '筛选学员',
			title: '',
			url: 'student_leach.html',
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
			url: 'student.html',
			items: [],
			fixed: true
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
			url: 'data1_list.html',
			items: [],
			fixed: false
		}, {
			id: '5_2',
			name: '学完率数据',
			title: '',
			url: 'data2.html',
			items: [],
			fixed: false
		}, {
			id: '5_3',
			name: '学习效果数据',
			title: '',
			url: 'data3_list.html',
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
			$('#content').find('iframe[src="' + url + '"]').height(_height);
		}
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
	});
	// xes.ui.tabs.listener(xes.ui.tabs.o.item,'click',function(d){
	// 	alert($(d).text());
	// });

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
});

/**
 * sidebar
 */
xes.platfrom.menu.create(xes.platfrom.menu.path).toggle().click();

xes.platfrom.tips();

$(function(){
	
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