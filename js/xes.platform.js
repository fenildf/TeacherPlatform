
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
		// console.log(h);
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

