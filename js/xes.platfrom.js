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
		// _wrap.find('h2[id^="sidemenu_"]:first').addClass('current_title').siblings('h2').removeClass('current_title');
		// _wrap.find('ul[id^="menu_"]:first').addClass('fold_current').siblings('ul').removeClass('fold_current');
		// _wrap.find('ul[id^="menu_"]:first > li:first').addClass('current').siblings('li').removeClass('current');
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
	PF.menu.click = function(fn){
		$('.sidebar .ui_fold_menu li').die('click').live('click',function(){
			// alert($(this).text());
			fn(this);
		});
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
		var _height = (h < _mainMinHeight) ? _mainMinHeight : h;
		// console.log('h: ' + h);
		// console.log('win: '+_winHeight);
		// console.log('main: '+ _mainMinHeight);
		// console.log(_height);
		$('#content').height(_height);
		if(url){
			$('#content').find('iframe[src="' + url + '"]').height(_height);
		}
		// PF.setIframeHeight();
	};
	// PF.setIframeHeight = function(h){
	// 	var _wrap = $('#content'),
	// 		_iframe = _wrap.find('iframe:visible'),
	// 		_height = h || _iframe.height();
	// 	// setTimeout(function(){
	// 		$('#content').height(_height);
	// 	// }, 5000);
	// 	// _wrap.height('auto');
	// };
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
	});

	//关闭按钮的点击事件
	$('.ui-tabs-items').find('li span.del_btn').die('click').live('click',function(){
		xes.ui.tabs.close($(this).parent().attr('id').replace('tab_',''));
	});
});



xes.platfrom.menu.create(xes.platfrom.menu.path).toggle().click(function(d){
	var _dom = $(d);
	// console.log(_dom.attr('fixed'));

	var _d = { 'id': _dom.attr('id'), 'title': _dom.text(), 'content': '', 'url': _dom.find('a').attr('url'), 'fixed': _dom.attr('fixed') };
	//根据左侧菜单创建tabs标签
	xes.ui.tabs.create(_d);
});



xes.setIframeHeight = xes.platfrom.setMainHeight;

