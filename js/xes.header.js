///mport xes.boot.js

/* ----------------------------|  xes.tools.js  |---------------------------------- */
xes.tools = xes.tools || {};

xes.tools.base64 = function(str){
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
};
/* ----------------------------|  xes.dom.js  |---------------------------------- */
///import xes.dom.js
xes.dom = xes.dom || {};
xes.dom.getID = function(id){
	return document.getElementById(id);
}; 
xes.dom.getTagName = function(dom, tag){
	return dom.getElementsByTagName(tag);
};

/* ----------------------------|  xes.event.js  |---------------------------------- */
///import xes.event.js
xes.event = xes.event || {};
/*
 * xes.addEvent.js
 * 事件监听函数
 * @参数 obj : 监听对象
 * @参数 ev : 监听事件类型
 * @参数 fn  : 触发脚本
 */
xes.event.listener = function( obj, ev, fn ){
	if( typeof obj.attachEvent != 'undefined' ){
		// 为 IE 浏览器添加事件绑定
		obj.attachEvent( 'on' + ev, fn );
	} else if( typeof obj.addEventListener != 'undefined' ){
		// 兼容 W3C 的事件绑定
		obj.addEventListener( ev, fn, false);
	} else {
		// 你用的浏览器都老掉牙了，换一个吧！
	}
};
xes.event.removeListener = function( obj, ev, fn){
	if( obj.detachEvent ){
		obj.detachEvent( 'on' + ev, obj[ev + fn] );
	}else{
		obj.removeEventListener( ev, fn, false );
	}
};

/* ----------------------------|  xes.cookie.js  |---------------------------------- */
///import xes.cookie.js
xes.cookie = xes.cookie || {};
xes.cookie.get = function(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return unescape(c.substring(nameEQ.length, c.length));
        }
    }
    return false;
};
xes.cookie.set = function(name, value, seconds){
    seconds = seconds || 0;
    var expires = "";
    if (seconds != 0) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/";
};
xes.cookie.del = function(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = xesCookie.get(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

/* ----------------------------|  xes.header.js  |---------------------------------- */
/*
 * xes.header.js
 * 头部公用JS
 * 
 */
xes.header = xes.header || {};

/*
 * 头部区域用到的一些配置信息
 */
xes.header.o = {
	topuser:'',
	searchInput:'',
	searchSubmit:'',
	nav:'',
	navCurrentCls:''
};

/*
 * 头部搜索框显示提示信息 + 搜索提交
 */
xes.header.search = function(){
	var _box = xes.dom.getID('headSearch');
	var _input = xes.dom.getTagName(_box, 'input')[0];
	
	_input.onfocus = function(){
		var _val = _input.value;
		_input.value = (_input.value == '老师名或课程名') ? '' : _input.value;
		_input.style.color = '#333333';
	}; 
	_input.onblur = function(){
		var val = _input.value;
		_input.value = (_input.value == '') ? '老师名或课程名' : _input.value;
		_input.style.color = (_input.value == '老师名或课程名') ? '#CCCCCC' : '#333333';
	};
	
	var _button = xes.dom.getTagName(_box,'button')[0];
	_button.onclick = function(){
		xes.header.searchSubmit(_input);
	};
	
	_input.onkeyup = function(e){
		var e = window.event || e ;
		if(e.keyCode == 13){  
			xes.header.searchSubmit(this);  
		}
	};
	return this;
};
/*
 * search表单提交函数
 */
xes.header.searchSubmit = function(input,url){
	var _v = input.value,
		_url = url || 'so.xueersi.com';;
	if( (_v !== '') && (_v !== '老师名或课程名') ) {
		_u = 'http://' + _url+ '/search?keyword=' + encodeURI(_v);
	}else{
		_u = 'http://' + _url;
	}
	window.top.location.href = _u;
};

/*
 * 导航切换+当前焦点设置
 */
xes.header.nav = function(){
	var _nav = xes.dom.getTagName(xes.dom.getID('headNavigation'), 'li');
	//var _nav = document.getElementById('headNavigation').getElementsByTagName('li');
	for( var i = 0, len = _nav.length; i < len; i++ ){
		_nav[i].onmouseover = function(){
			if(this.className == ''){
				this.className = 'current';
			}else if(this.className != 'current'){
				this.className += ' current';
			}

		};
		_nav[i].onmouseout = function(){
			var _cls = this.className;
			this.className = _cls.replace('current','');
		};
	}
	return this;
};

/*
 * 头部用户登录判断
 */
xes.header.userinfo = function(){
	var _topuser = xes.dom.getID('topUserbar'),
		_topcart = xes.dom.getID('topCarttotal'),
		_callbackurl = xes.tools.base64(window.location.href);
		_default = '<em>您好，欢迎来学而思网校！</em><a title="登录" class="login" href="http://' + xes.domain + '/users/logReg/' + _callbackurl + '" target="_self" onmousedown="hits(\'banner12\');" onclick="_gaq.push([\'_trackEvent\', \'login\', \'head-login\', \'顶部登陆\']);" xes_id="banner12">登录</a><a title="注册" href="http://' + xes.domain + '/users/showReg" target="_self" onmousedown="hits(\'banner13\')" onclick="_gaq.push([\'_trackEvent\', \'login\', \'head-registered\', \'顶部注册\']);" xes_id="banner13">注册</a>',
		_username = xes.cookie.get('CakeCookie[username]'),
		_logged = '<em>欢迎您！</em><a href="http://i.xueersi.com/" xes_id="banner14">学习中心</a><a href="http://' + xes.domain + '/users/logout/" xes_id="banner15">退出</a>';
	//_topuser.innerHTML = ( _username == '' ? _default : ( _username + _logged ) );
	if(window.jQuery){
		_getUser(window.jQuery);
	}else{
		xes._loadScript(xes.path.js + 'widget/xes.widget.jquery.js',function(){
			var jq;
			if(window.location.hostname == 'bbs.xueersi.com'){
				jq = jQuery.noConflict(true);
			}else{
				jq = window.jQuery;
			}
			_getUser(jq);
		});
	}
	function _getUser(jq){
		var _hostname = (xes.domain == 'www.xes.com' || xes.domain == 'bbs.xueersi.com' || xes.domain == 'star.xueersi.com') ? 'www.xueersi.com' : xes.domain;
		if(jq){
		jq.getJSON('http://' + _hostname + '/users/aGetUsername?callback=?', function (result) {
		    _username = result.username;
			    if(_topuser){
			    	_topuser.innerHTML = ( _username == '' ? _default : ( '<em class="top_username">' + _username + '</em>' + _logged ) );
						}
			    if(_topcart){
			    	_topcart.innerHTML = '&nbsp;' + (result.carttotal == undefined ? 0 : result.carttotal) + '&nbsp;';
		        }
		    });
		}
	}

	// var _username = this.o.username;

	
	return this;
};
/*
 * 添加收藏
 */
xes.header.addFavarite = function(){
	var _btn = xes.dom.getID('topCollect');
	_btn.onclick = function(){
		var _url = 'http://www.xueersi.com',
			_tit = '学而思网校';
		if(window.sidebar) {
			window.sidebar.addPanel(_tit, _url, "");
		} else if(document.all) {
			var external = window.external;
			external.AddFavorite(_url, _tit);
		// } else if(window.opera && window.print) {
			// alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
			// return true;
		}else {
			alert('您使用的浏览器不支持此操作。\n请使用 Ctrl + D 进行添加，或手动在浏览器里进行设置。');
			return true;
		}	
	};
	return this;
};
/*
 * 购物车模块
 */
xes.header.shoppingcart = function(){};
/*
 * 预留的logo特效功能模块
 */
xes.header.logo = function(){};

xes.header.topbar = function(){};

/*
 * 统计代码加载模块
 */
xes.header.statistic = function(){};

/*
 * 意见反馈模块
 * 原来的需要jQuery库文件
 * 新版最好不要用到jQuery
 */
 /*
xes.header.feedback = function(){
	function DomFix(d) {
	    var isIE6 = /MSIE 6\./.test(navigator.userAgent) && !window.opera;
	    if (isIE6) {
	        var menuYloc = $(d).offset().top;
	        $(window).scroll(function () {
	            var offsetTop = menuYloc + $(window).scrollTop() + "px";
	            $(d).animate({
	                top: offsetTop
	            },
	            {
	                duration: 30,
	                queue: false
	            });
	        });
	    } else {}
	}
	
	function feedbackBtn() {
	    var _html = '<div class="research" id="FeedBackBtn">' + ' <div class="float_search_box">' + '  <div class="homepage_searchbtn">' + '     <a target="_blank" href="http://' + xes.domain + '/Help/feedback">&nbsp;</a>' + '  </div>' + ' </div>' + '</div>';
	    if ($('#FeedBackBtn').length == 0) {
	        $('body').append(_html);
	    }
	    DomFix($("#FeedBackBtn")[0]);
	}
};*/
/*
 * 延时加载
 */
(function(){
	setTimeout(function(){
		xes.header.userinfo().search().nav().addFavarite();
	},100);
})();
