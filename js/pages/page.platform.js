
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */



///import:ui/xes.ui.select.js///

///import:ui/xes.ui.tabs.js///

///import:xes.platform.js///

///import:widget/jquery.base64.js///

///import:widget/jquery.cookie.js///


/* =-=-=-=-=-=-=-=-=-=-=-= platform.html =-=-=-=-=-=-=-=-=-=-=-=-= */
// 跳出iframe
if (self.location != top.location) {
    top.location = self.location;
}
/**
 * sidebar
 */
xes.platform.menu.toggle().click();
xes.platform.tips();
saveUserName();
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
		mainWrap : $('.mainbody'),
		isCookie : true
		//增加回调函数
		// ,callback : function(act){
			//act返回的是当前激活的标签对象
			// var url = act.find('a').attr('url');
			// xes.platform.setMainHeight(false, url);
		// }
	});
});

$(window).resize(function(){
	var url = $('#content iframe:visible').attr('src');
	setIframeHeight();
});
$(function(){
	//tabs的点击事件
	$('.ui-tabs-items').find('li a').die('click').live('click',function(){
		var _id = $(this).parent().attr('id');
		_id = _id.replace('tab_','');
		
		var _url = $(this).attr('url');
		//根据点击的url获取左侧当前激活的dom
		var _node = $('#sidebar li a[url="' + _url + '"]');
		_dom = _node ? _node.parent() : false;
		xes.platform.menu.setActive(_dom);
		xes.ui.tabs.click(_id);
		// setIframeHeight();
	});

	//关闭按钮的点击事件
	$('.ui-tabs-items').find('li span.del_btn').die('click').live('click',function(){
		xes.ui.tabs.close($(this).parent().attr('id').replace('tab_',''), function(d){
			//回调函数，用于设置左侧当前激活状态
			var _node = $('#sidebar li a[url="' + d.attr('url') + '"]');
			_dom = _node ? _node.parent() : false;
			xes.platform.menu.setActive(_dom);
			// setIframeHeight();
		});
		
	});
	//头部搜索
	$('#headSearch_submit').click(function(){
		$(this).parents('form')[0].onSubmit = false;
		var key = $('#headSearch_form').find('input.input_text_ui');
		var val = key.val();
		if(val != '学员名称' && val != '课程名称' ){
			$('#headSearch_value').val(val);
		}else{
			$('#headSearch_value').val('');
		}
		headSearch();
	});
	$('#headSearch_select').find('li a').click(function(){
		var input = $('#headSearch_form').find('.input_text_ui');
		var text = $(this).text();
		if(text == '学员'){
			input.val('学员名称');
			xes.platform.tips('学员名称');
		}else{
			input.val('课程名称');
			xes.platform.tips('课程名称');
		}
		$('#headSearch_type').val($(this).text());
	});
	
	//增加backspace按键返回操作
	// $('body').keyup(function(e){
	// 	goBack(e);
	// });

	//刷新页面时根据头部激活标签，设置左侧菜单当前状态
	getActiveTabs(function(tab){
		var tab_id = tab.attr('id');
		tab_id = tab_id.replace('tab_','');
		var _dom = $('#sidebar li#'+tab_id);
		xes.platform.menu.setActive(_dom[0]);
	});

	$('#headSearch_select li').hover(function(){
		$(this).addClass('ui-select-hover').siblings('li').removeClass('ui-select-hover');
	});

	//顶部老师名称点击事件
	$('#topTeacherName').click(function(){
		openTabs(this);
	});
});
/**
 * 把用户名存储到cookie中（base64加密后，并替换最后的等号为'_'）
 */
function saveUserName(){
	var user = $('#username').val();
	var username = $('#header .ui_user_list li:first').text();
	username = $.trim(username);

	if(user){
		$.base64.is_unicode = false;
		var baseUser = $.base64.encode(user);
		//替换等号为下划线
		baseUser = baseUser.replace(/=/g,'_');
		$.cookie('platform_u',baseUser, {expires:7});
		$.cookie('platform_n',username, {expires:7});
	}
}
/**
 * 从cookie中读取用户名（base64解密）
 */
function getUserName(){
	var u = $.cookie('platform_u');
	if(!u){
		saveUserName();
	}
	//把原来替换后的等号还原
	u = u.replace(/_/g,'=');
	u = $.base64.decode(u);
	return u;
}

function headSearch(id){
	var tp = $('#headSearch_type').val(),
		val = $('#headSearch_value').val();
	var id = tp == '课程' ? 'menu_1_1_1' : 'menu_3_3_1'; 

	var d = xes.platform.menu.getItem(id);
	openTabs(d.url, d.name, id);
	xes.platform.findChild(id, '.search_key', function(dom){
		if(typeof dom != 'string'){
			dom.val(val);
			var form = dom.parents('form#listSerch');
			form.find('#currpage').val(1);
			form.find('#selectGrade,#selectCourseType,#gradeId').val(0);
			form.find('#courseId').val('');
			form.submit();
		}
	});
}
/**
 * 判断iframe是否加载完成
 * @param iframeEl : 为iframe元素
 * @param callback : 为加载后的回调函数
 */
var iframeLoaded = xes.platform.iframeLoaded;

/** ============================ 下面是提供给子页面调用的函数 window.parent ========================== **/
/**
 * 设置iframe高度
 */
var setIframeHeight = xes.platform.setMainHeight;

/**
 * 公用创建标签的方法
 * obj = {id,title,content,url,fixed}
 * 如果在sidebar中已经存在的了，则直接调用
 */
var createTabs = function(obj, fn){
	if(obj.url){
		var _menu = $('#sidebar ul.ui_fold_menu li').find('a[url="' + obj.url + '"]');
		if(_menu.length >0 && (_menu.parent().attr('id') == obj.id)){
			_menu.parent().click();
		}else{
			//根据左侧菜单创建tabs标签
			xes.ui.tabs.create(obj).click(obj.id);
		}
		if(fn){
			fn(obj.id);
		}
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
var openTabs = function(dom, text, id, fn){
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

	createTabs(_d, fn);

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
	refreshTabs(_id);
};

var closeActiveTabs = function(id){
	
	var _tab = id ? $('.ui-tabs-items').find('#tab_'+id) : $('.ui-tabs-items > li.current');
	console.log(id);
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

/**
 * 刷新标签
 */
var refreshTabs = xes.platform.menu.refreshContent;

/**
 * 返回上一页
 	$('body').keyup(function(e){
		goBack(e);
	});
 */
var goBack = function(e){
	//增加backspace按键返回操作
	var code = e.keyCode;
	if(code == 8){
		xes.ui.tabs.backHistory(function(){
			setIframeHeight();
		});
	}
};

/**
 * 获取老师名称
 */
var getTeacherName = function(){
	
	var username = $.cookie('platform_n');
	if(username){
		return username;
	}else{
		username = $('#header .ui_user_list li:first').text();
		username = $.trim(username);
		return username;
	}
};

/**
 * 鼠标移入时显示图片
 * @return {[type]} [description]
 */
var imgViews = function(url,top,left){
		var _d = {
			width : '400px',
			height: 'auto'
		};
		var _wrap = '<div id="pictureView" style="position:absolute;z-index:1000;"></div>';
		var _img = '<a href="' + url + '" target="_blank">'
				 + '	<img src="' + url + '" alt="" style="width:400px;height:auto;" />'
				 + '</a>';
		var _box = $('#pictureView');
		if(_box.length > 0){
			_box.html(_img);
		}else{
			_img = $(_wrap).append(_img);
			$('body').append(_img);
		}
		$('#pictureView').css({
			top:top + 108,
			left:left + $('#sidebar').offset().left + $('#sidebar').outerWidth()
		}).show();
};

var imgViewHide = function(id){
	var id = id || 'pictureView'
	$('#'+id).hide();
};

/**
 * 设置滚动条高度
 * @param {Number} t 滚动距离
 */
var setScrollTop = function(t){
	$(window).scrollTop(t);
};