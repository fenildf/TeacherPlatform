/*
使用方式
<script type="text/javascript">var loadStartTime=new Date().valueOf();</script>
<script type="text/javascript" src="http://analysis.xueersi.com/statistic/js/statistic_src.js?<?php echo time();?>"></script>
*/
	//配置信息
	var xesConfig = {
		//页面加载开始时间
		loadStartTime : typeof(loadStartTime)=="undefined" ? parseInt(new Date().valueOf())-1000 : loadStartTime ,
		//页面路径
		pageUrl : document.location.href,	
		//处理数据路径
		//dealPath : "http://www.stat.com/statistic/app/web.php?mod=visit",
		dealPath : "http://analysis.xueersi.com/statistic/app/web.php?mod=visit",
		//cookie键: 上一次访问页面地址
		CK_PU : '__XES_CK_PU',
		//cookie键: 上一次访问页面加载完成时间
		CK_LET : '__XES_CK_LET',
		//cookie键: 其他用户来源
		CK_OUS : '__XES_CK_OUS',
		//cookie键: 热点用户来源
		CK_HUS : 'source',
		//cookie键: cakephp
		CK_CAKEPHP : 'CAKEPHP',
		//网站域
		domain : 'xueersi.com',
		//指定的来源
		bindSengin : ['baidu', 'google', 'aoshu'],
		
		win : window,
		doc : document,
		nav : navigator,
		ref : document.referrer,

		//设置Cookie(键,值,过期时间,路径,域名)
		setCookie : function(name, value, expires, path , domain){
			var e = new Date();
			e.setTime(e.getTime() + (expires * 3600));
			xesConfig.doc.cookie = name + "=" + escape(value) + (expires ? "; expires=" + e.toGMTString() : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "");
		},
		getCookie : function(name){
			var patt  = new RegExp("(^| )" + name + "=([^;]*)(;|\x24)");
			var res = patt.exec(xesConfig.doc.cookie);
			if (res) {
				return unescape(res[2]) || '';
			}
			return '';
		}
	};



	//每次页面访问的对象
	function xesVisit() {
		this.params = {};
		this.init();
	}
	//访问统计环境分析模块
	xesVisit.prototype = {
		init: function(){
			this._setParam();
			var img = new Image(1,1);
			img.src = xesConfig.dealPath + '&' + this._getParam();
		},
		//设置参数
		_setParam : function(){
			//来源名称
			this.params.sourceName = this._getSource();
			//系统类型
			this.params.system = xesConfig.nav.platform;
			//当前页面地址
			//xesConfig.pageUrl +='search?keyword=秋季班&grade=0&subject=0&type1=0&type2=0&type3=0&price=0&curpage=2';
			this.params.curPageUrl = this._dealUrl(xesConfig.pageUrl);
			//前一页面地址
			this.params.perPageUrl = xesConfig.getCookie(xesConfig.CK_PU);
			//把当前页面地址写入 cookie
			xesConfig.setCookie(xesConfig.CK_PU, this.params.curPageUrl);
			//浏览器内核及版本
			this.params.browerVersion=this._getBrower();
			//Flash版本
			this.params.flashVersion=this._getFlash();
			//页面加载开始时间
			this.params.curLoadStartTime = xesConfig.loadStartTime;
			//页面加载结束时间
			this.params.curLoadEndTime = new Date().valueOf();
			//前一页面加载完成时间
			this.params.perLoadEndTime = xesConfig.getCookie(xesConfig.CK_LET);
			//把前一页面加载完成时间 写入cookie
			xesConfig.setCookie(xesConfig.CK_LET, this.params.curLoadEndTime);
			//得到cakephp
			this.params.visitSign =  xesConfig.getCookie(xesConfig.CK_CAKEPHP);
			
		},
		
		//处理来源
		_getSource: function(){	
			var sourceName;	
			//this.params.sourceWay 为 来源方式(1=花钱,2=免费)
			this.params.sourceWay = 1;
			//得到热点来源
			sourceName = xesConfig.getCookie(xesConfig.CK_HUS);
			//如果存在热点来源
			if(sourceName != ""){
				return sourceName;
			}
			//得到其他来源
			this.params.sourceWay = 2;
			sourceName = xesConfig.getCookie(xesConfig.CK_OUS);
			//如果存在其他来源
			if(sourceName != ""){
				return sourceName;
			}
			//得到页面来源地址
			sourceName = xesConfig.ref;
			//如果没有来源页面地址
			if(sourceName == ""){
				this.params.sourceWay = '';
				return '';
			}
			//得到来源页面域名
			sourceName = this._getDomain(sourceName);
			console.log(sourceName);
			console.log(xesConfig.domain);
			//检测来源页面域名是否是本站
			if(sourceName.indexOf(xesConfig.domain) > -1){
				this.params.sourceWay = '';
				return '';
			}
			//检测来源页面域名是否指定的来源
			this.params.sourceWay = 2;
			var _len = xesConfig.bindSengin.length;
			for (var i=0; i<_len; i++) {
				var _tmp = xesConfig.bindSengin[i];
				if (sourceName.indexOf(_tmp) > -1)  {
					sourceName = _tmp;
					break;
				}
			}
			//把来源写入cookie
			xesConfig.setCookie(xesConfig.CK_OUS, sourceName);
			return sourceName;
		},	
		
		//获取浏览器信息
		_getBrower: function(){
			var ua=xesConfig.nav.userAgent.toLowerCase(), _bv='', _bw='' ,_s;
			if (ua.indexOf('msie')>-1){
				//Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) 
				_bw='ie';
				_bv = (_s=ua.match(/msie ([\d]+.[\d]+)/)) ? _s[1] : 0;
			}else if (ua.indexOf('firefox')>-1){
				//Mozilla/5.0 (Windows; U; Windows NT 5.2) Gecko/2008070208 Firefox/3.0.1 
				_bw = 'firefox';
				_bv = (_s=ua.match(/firefox\/([\d]+.[\d]+)/)) ? _s[1] : 0;
			}else if (ua.indexOf('opera')>-1){
				//Opera/8.0 (Macintosh; PPC Mac OS X; U; en)
				//Mozilla/5.0 (Macintosh; PPC Mac OS X; U; en) Opera 8.0  
				_bw = 'opera';
				_bv = (_s=ua.match(/opera.([\d]+.[\d]+)/)) ? _s[1] : 0;
			}else if (ua.indexOf('chrome')>-1){
				//Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13 
				_bw = 'chrome';
				_bv = (_s=ua.match(/chrome\/([\d]+.[\d]+)/)) ? _s[1] : 0;
			}else if (ua.indexOf('safari')>-1){
				//Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13
				//Mozilla/5.0 (iPhone; U; CPU like Mac OS X) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/4A93 Safari/419.3 
				_bw = 'safari';
				_bv = (_s=ua.match(/version\/([\d]+.[\d]+).*safari/)) ? _s[1] : 0;
			}else{
				_bw = 'other';
			}
			return _bw+_bv;
		},
		
		//获取Flash版本
		 _getFlash: function() {
			var f = "-";
				if (xesConfig.nav.plugins && xesConfig.nav.mimeTypes.length) {
					var k = xesConfig.nav.plugins["Shockwave Flash"];
					if (k && k.description) {
						f = parseInt(k.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".")) + ".0";
					}
				} 
				else if (window.ActiveXObject) {
					for(var ii = 10; ii >= 2; ii--){
						try{
							var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
							if (fl) {
								f = ii + '.0';
								break;
							}
						} 
						catch (e){
						}
					}
			}
			return f;
		},
		//得到参数
		_getParam: function(){
			var result = [];
			for(var key in this.params){
				result.push(key+'='+this.params[key]);
			}
			return result.join('&');
		},
		//得到域名
		_getDomain : function(url){
			var res = url.replace(/^http:\/\/([^\.]+)((\.[^\.\/\?]+)+)\/?.*$/i,"$1$2");
			return res;
		},
		//处理页面地址
		_dealUrl : function(url){
			url = url.replace('http://','');
			url = url.replace('HTTP://','');
			url	= encodeURIComponent(url);
			return url;
		}
		
	}
	new xesVisit();
