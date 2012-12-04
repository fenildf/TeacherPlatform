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

	setTimeout(function(){
		xes.iframe.setHeight();
	},100);
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
	alert(id);
	console.log('id:'+id);
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


/* =-=-=-=-=-=-=-=-=-=-=-= ui/xes.ui.tips.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * tips
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var tips = tips || {};

(function(){
	var t = tips;

	t.create = function(tp, content){
		var _html = '<div class="ui_tips tips_' + tp + '"><span>' + content + '</span><a href="javascript:void(0);" class="tips_close">关闭</a></div>';
		if($('.ui_tips').length == 0){
			$('body').append(_html);
		}else{
			$('.ui_tips').attr('class','ui_tips tips_'+tp).find('span').text(content);
		}
		// this.show();
		this.dom = $('.ui_tips');
		this.dom.find('.tips_close').die('click').live('click',function(){
			t.close();
		});
		return this;
	};

	t.show = function(dom){
		var _tips = dom || this.dom;
		_tips.fadeIn();
		return this;
	};
	t.hide = function(dom){
		var _tips = dom || this.dom;
		_tips.fadeOut();
		return this;
	};
	t.close = function(fn){
		if(fn){
			fn(t.dom);
		}
		t.hide();
		return this;
	};

	t.error = function(content){
		this.create('error',content).show();
	};
	t.succeed = function(content){
		this.create('succeed',content).show();
	};
	t.help = function(content){
		this.create('help',content).show();
	};
	t.info = function(content){
		this.create('info',content).show();
	};

})();


/* 注册到UI库 */
(function(xes){
	if(xes.ui){
		xes.ui.add('tips',tips,function(msg){
			// console.log(msg);
			// if(msg === 'ok'){
			// 	xes.ui.tips.init();
			// }
			xes.tips = xes.ui.tips;
		});
	}
})(xes);


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





/* =-=-=-=-=-=-=-=-=-=-=-= xes.form.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * form操作
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var xform = xform || {};

(function(){
	var f = xform;

		/**
		* 复选框全选
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3">
		*
		*			<input type="checkbox" id="checkAll" name="checkAll" onclick="checkAllBoxes_1('checkbox[]');">全选
		*
		* @param string cbs_id 复选框id
		* @return
		*/
		f.checkAll = function (cbs_id) {
			var ifChecked = $('input[type="checkbox"][id="checkAll"]').attr('checked');
			$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
				$(this).attr('checked', ifChecked);
			});
		};


		/**
		* 复选框全选
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3">
		*
		*			<a href="javascript:void(0);" onclick="checkAllBoxes_2('checkbox[]'); return false;">全选</a>
		*
		* @param string cbs_id 复选框id
		* @return
		*/
		f.checkAll2 = function (cbs_id) {
			var uncheckedBox = 0;
			// 全选所有复选框
			$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
				if($(this).attr('checked') == false) {
					$(this).attr('checked', true);
					uncheckedBox = 1;
				}
			});

			// 如果所有复选框都已被选择,则全部取消选择
			if(uncheckedBox == 0) {
				$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
					$(this).attr('checked', false);
				});
			}
		};

		/**
		* 复选框反选
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3" checked>
		*
		*			<a href="javascript:void(0);" onclick="checkInverseBoxes('checkbox[]'); return false;">反选</a>
		*
		* @param string cbs_id 复选框id
		* @return
		*/
		f.checkInverse = function (cbs_id) {
			$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
				$(this).attr('checked', $(this).attr('checked') ? false : true);
			});
		};



		/**
		* 复选框选择(根据复选框的值 选中复选框)
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3">
		*
		*			<a href="javascript:void(0);" onclick="checkBoxes('checkbox[]', '2,3'); return false;">复选框选择</a>
		*
		* @param string cbs_ids 复选框id
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.checkBoxes = function (cbs_id, cbs_values) {
			$.each($('input[type="checkbox"][id="' + cbs_id + '"]'), function() {
				$(this).attr('checked', false);
			});
			$.each(cbs_values.split(','), function(i, n) {
				$('input[type="checkbox"][id="' + cbs_id + '"][value="' + n + '"]').attr('checked', true);
			});
		};


		/**
		* 单选框选择(根据单选框的值 选中单选框)
		* @example
		*			<input type="radio" id="type" name="type" value="1">
		*			<input type="radio" id="type" name="type" value="2">
		*			<input type="radio" id="type" name="type" value="3">
		*
		*			<a href="javascript:void(0);" onclick="checkRadio('type', '2'); return false;">单选框选择</a>
		*
		* @param string r_id 单选框id
		* @param string r_value 要选择的单选框的值
		* @return
		*/
		f.checkRadio = function (r_id, r_value) {
			$('input[type="radio"][id="' + r_id + '"][value="' + r_value + '"]').attr('checked', true);
		};


		/**
		* 下拉框选择(根据下拉框的值 选中下拉框)
		* @example
		*			<select id="city" name="city">
		*			<option value='1'>北京</option>
		*			<option value='2'>天津</option>
		*			<option value='3'>上海</option>
		*			</select>
		*
		*			<a href="javascript:void(0);" onclick="checkSelect('city', '2'); return false;">下拉框选择</a>
		*
		* @param string r_id 下拉框id
		* @param string r_value 要选择的下拉框的值
		* @return
		*/
		f.checkSelect = function (s_id, s_value) {
			$('select[id="' + s_id + '"] option[value="' + s_value + '"]').attr('selected', true);
		};

		/**
		* 获取复选框选中项的值,以逗号隔开
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3" checked>
		*
		*			<a href="javascript:void(0);" onclick="alert(getCheckedValue('checkbox[]')); return false;">复选框选择</a>
		*
		* @param string cbs_ids 复选框id
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.getCheckedValue = function (cbs_id) {
			var values = '';
			$.each($('input[name="' + cbs_id + '"]:checked'), function() {
				values = values + ',' + $(this).attr('value');
			});
			return values.slice(1);
		};

		/**
		* 获取复选框选中项的TEXT值,以逗号隔开
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3" checked>
		*
		*			<a href="javascript:void(0);" onclick="alert(getCheckedValue('checkbox[]')); return false;">复选框选择</a>
		*
		* @param string cbs_ids 复选框id
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.getCheckedText = function (cbs_id) {
			var values = '';
			$.each($('input[name="' + cbs_id + '"]:checked'), function() {
				values = values + $(this).attr('title');
			});
			return values;
		};

		/**
		* 获取下拉框选中项的值
		* @example
		*			<select id="city" name="city">
		*			<option value='1'>北京</option>
		*			<option value='2'>天津</option>
		*			<option value='3'>上海</option>
		*			</select>
		*
		* @param string s_id 下拉框id
		* @param string selected_value 要选择的下拉框的值
		* @return string
		*/
		f.getSelectedText = function (s_id) {
			var value = ''
			if($('select[id="' + s_id + '"] option:selected').attr('value') != ''){
				value = $('select[id="' + s_id + '"] option:selected').text();
			}
			return value;
		};

		/**
		* 删除操作确认
		* @example
		*			<a href="javascript:void(0);" onclick="confirmDelete('确认删除\"二年级\"么?', '/grades/delete/2/'); return false;">删除</a>
		*
		* @param string msg 提示文字
		* @param string url 确认后要跳转的URL地址
		* @return
		*/
		f.confirmDelete = function (msg, url) {
			if(confirm(msg)) {
				window.location.href = url;
			}
		};


		/**
		* 当点击复选框时，把复选框的值添加或删除到cookie,并在分页时把选中的checkbox值选中
		*
		* @param string id table ID
		* @param string name 存在COOKIE中的KEY值例如cookie[name] = ',2,3,4,5,'
		*/
		f.tableCheckbox = function (tableid, name){
			if(name==''){name = 'checkvalue';}
			//cookie中存放的值
			var cookievalue = $.cookie(name);
			if(cookievalue==null){
				cookievalue = ',';
			}
			$.each($('table[id='+tableid+'] tr input[type="checkbox"]'),function (){
				var indexof = cookievalue.indexOf(','+$(this).val()+',')
				if(indexof>=0){
					$(this).attr('checked',true);
				}
			});

			$('table[id='+tableid+'] tr input[type="checkbox"]').click(function(){
				//点击checkbox的值
				var checkedvalue = $(this).val();
				//方便搜素特殊处理的值
				//var searchvalue = ','+$.cookie(name);
				//如果checkbox为选中状态
				if($(this).attr('checked') === true){
					//查找选中checkbox值在cookie中是否存在
					var indexof = cookievalue.indexOf(','+checkedvalue+',')
					//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
					if(indexof == -1){
						//将指定的值添加到cookie中
						cookievalue = cookievalue+checkedvalue+',';
					}
					$.cookie(name, cookievalue, { path: '/', expires: 0 });
				}
				//如果checkbox为未选中状态
				if($(this).attr('checked') === false){
					//查找选中checkbox值在cookie中是否存在
					var indexof = cookievalue.indexOf(','+checkedvalue+',')
					//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
					if(indexof >=0 ){
						//删除cookie中指定的值
						cookievalue = cookievalue.replace(','+checkedvalue+',' , ',');

					}
					$.cookie(name, cookievalue, { path: '/', expires: 0 });
				}
			});
		}





})();


xes.form = xform;







// 生成随机字符串
function generateMixed(n) {
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
};


/* =-=-=-=-=-=-=-=-=-=-=-= xes.search.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * search表单相关操作
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


/**
 * 在提交表单之前，充值分页数为1
 */
$(function(){
    var submit = $('#listSerch input:submit');
    submit.mousedown(function(){
        $('#pages').val(1);
        $('#currpage').val(1);
        $('#listSerch')[0].onSubmit = false;
    });
    submit.mouseup(function(){
        $('#listSerch')[0].onSubmit = true;
    });
});

/* =-=-=-=-=-=-=-=-=-=-=-= xes.search.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * pages分页相关操作
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


$('#pages').change(function(){
    var _page = this.value;
     $("#currpage").val(_page);
     $("#listSerch").submit();
});
$(".ui_pages a").click(function(){
    _url = $(this).attr('href');
    _re = /curpage\:(\d+)$/;
    _page = _url.match(_re);
    if(_page!=null){
        $("#currpage").val(_page[1]);
        $(this).attr('href','###');
        $("#listSerch").submit();
    }
});



/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * Date日期处理方法
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


/**      
* 对Date的扩展，将 Date 转化为指定格式的String      
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
* eg:      
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18   
    
//var date = new Date();      
//window.alert(date.pattern("yyyy-MM-dd hh:mm:ss"));      
*/        
Date.prototype.format=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "\u65e5",         
    "1" : "\u4e00",         
    "2" : "\u4e8c",         
    "3" : "\u4e09",         
    "4" : "\u56db",         
    "5" : "\u4e94",         
    "6" : "\u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}

xes.date = xes.date || {};

(function(){
	var d = xes.date;
	/**
	 * 根据日期获得星期数
	 * alert(getWeekday('2012-12-3'))
	 */
	d.getWeek = function(sdate){
		var _date = new Date(sdate.replace(/-/g, '/'));
	    var _week = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六'];
	    return _week[_date.getDay()];
	};

    d.clock = d.clock || {};
    d.clock.date = '';
    d.clock.dom = '';
    
    d.clock.count = function(){
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.date = date.getDate();
        this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
        this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        this.toString = function() {
            return "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
        };
        this.toSimpleDate = function() {
            return this.year + "-" + this.month + "-" + this.date;
        };
        this.toDetailDate = function() {
            return this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
        };
        this.display = function(ele) {
            var count = new d.clock.count(day);

            var html = count.toDetailDate();
            ele.html(html); 
            window.setTimeout(function() {
                count.display(ele);
            }
            , 1000);
        };
    };

    d.clock.serverClock = function(s_year, s_month, s_day, s_hour, s_min, s_sec) {
        //估计从服务器下载网页到达客户端的延时时间，默认为1秒。 
        var _delay = 1000;

        //服务器端的时间 
        var serverTime = null;
        if(arguments.length == 0) {
            //没有设置服务器端的时间，按当前时间处理 
            serverTime = new Date();
            _delay = 0;
        } else {
            serverTime = new Date(s_year, s_month - 1, s_day, s_hour, s_min, s_sec)
        };

        //客户端浏览器的时间 
        var clientTime = new Date();
        //获取时间差 
        var _diff = serverTime.getTime() - clientTime.getTime();

        //设置从服务器下载网页到达客户端的延时时间，默认为1秒。 
        this.set_delay = function(value) {
            _delay = value;
        };

        //获取服务的日期时间 
        this.get_ServerTime = function(formatstring) {
            clientTime = new Date();
            serverTime.setTime(clientTime.getTime() + _diff + _delay);
            if(formatstring == null) {
                return serverTime;
            }else{
                return serverTime.format(formatstring);
            }
        };
    };

    d.clock.start = function(dom,day){
        var day = dom.text();
        var time = {};
        time.tmp = day.split(' ');
        time.days = time.tmp[0].split('-');
        time.times = time.tmp[1].split(':');

        time.year = time.days[0];
        time.month = time.days[1];
        time.day = time.days[2];

        time.hour = time.times[0];
        time.minute = time.times[1];
        time.second = time.times[2];

        var srvClock = new d.clock.serverClock(time.year, time.month, time.day, time.hour, time.minute, time.second); 

        window.setInterval(function(){ 
            var html = srvClock.get_ServerTime('yyyy-MM-dd HH:mm:ss');
            dom.html(html); 
        },500);

    };

    d.clock.stop = function(){
        clearTimeout(d.clock.timeout);
    };






})();



// var clock = new Clock();
// function Clock() {
//     var date = new Date();
//     this.year = date.getFullYear();
//     this.month = date.getMonth() + 1;
//     this.date = date.getDate();
//     this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
//     this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//     this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//     this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//     this.toString = function() {
//         return "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
//     };
//     this.toSimpleDate = function() {
//         return this.year + "-" + this.month + "-" + this.date;
//     };
//     this.toDetailDate = function() {
//         return this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
//     };
//     this.display = function(ele) {
//         var clock = new Clock();
//         ele.html( clock.toString() ); 
//         window.setTimeout(function() {
//             clock.display(ele);
//         }
//         , 1000);
//     };
// }
// clock.display($('#clock'));



// var oTime = $('.times');

// function _fresh(){
//     var starTime = new Date("2012/12/4 14:40:00");
//     var Times = {
//         y : starTime.getFullYear(),
//         ms : starTime.getMonth()+1,
//         d : starTime.getDay(),
//         h : starTime.getHours(),
//         mn: starTime.getMinutes(),
//         s : starTime.getSeconds()
//     }
//     var oDate = new Date();
    
//     var leftsecond = parseInt( ( starTime.getTime() - oDate.getTime() )/1000 );
//     var oSec=Math.abs(parseInt((((leftsecond%86400000)%3600000)%60000)));
//     var oMin=parseInt(Math.abs(parseInt(oSec/60%60)));
//     var oHour=Math.abs(parseInt(oMin/60));
//     var oDays=Math.abs(parseInt(oHour/24));
//     var h = (Times.h + oHour)%24;
//     var m = (Times.mn + oMin)%60;
//     var s = (Times.s + oSec)%60;
//     //alert(oHour);
//     all = Times.y + '年' + Times.ms + '月' + Times.d   + '日' + h + '时' + m + '分' + s + '秒';
//     /*if(leftsecond >= 0){
//         oTime.text(oHour + '时' + leftsecond).css('background','yellow'); //'请等待>>>>>>>>'
//     }*/
//     if(leftsecond < 0 && leftsecond >- 360000000000000000000000000000){
//         oTime.text(all).css('background','green'); 
//     }
//     /*else if(leftsecond <= -4){
//         oTime.text(leftsecond).css('background','red');   //'OVER'
//     }*/
// }


// _fresh();
// var sh=setInterval(_fresh,100);


/* 
名称：服务器时钟（一次读取，实时显示） 
功能：在客户端浏览器上显示服务器端的时间。 
原理：     
    算法步骤： 
    1. 获取服务端的日期时间。 
    2. 根据客户端浏览器的时间可以得到服务器和客户端的时间差。 
    3. 服务器的时钟 = 客户端的时钟（变化值）+ 时间差（固定值） 
     
    这样客户端就没有必要实时的到服务器端去取时间。 

作者：三月三 
来源：http://www.cnblogs.com/march3/archive/2009/05/14/1456720.html 
说明： 
    1. 多浏览器支持 
    2. 由于网络延时无法估计的原因，会有一定的误差。 
        用户可以通过 set_delay() 方法来减少误差。 
参数： 
    s_year, s_month, s_day, s_hour, s_min, s_sec   
    分别为服务器端的 年 月 日 时 分 秒， 

    例如：2008,9,19,0,9,0 表示 2008年9月19日 0点9分0秒 



用法
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
 <head> 
  <title> 在客户端显示服务器时钟Demo </title> 
</head> 

<body> 
<div id="time"></div> 
<script language="javascript" src="ServerClock.js"></script> 
<script language="javascript"> 
<!-- 
/* 
以下代码中：2008,9,19,0,9,0 为服务器端返回的时间， 

以 ASP.NET代码为例 
 var srvClock = new ServerClock(<%=DateTime.Now.ToString("yyyy,M,d,H,m,s") %>); 
*
var srvClock = new ServerClock(2008,9,19,0,9,0); 

/* 时间格式化字符串 *
var fmtStr = "服务器的时间是：<br/>yyyy年MM月dd日 HH:mm:ss E<br/>是该年的第D天<br/>是该年的第w周<br/>"; 

/*  
由于网络延时无法估计的原因，会有一定的误差。用户可以通过 set_delay() 方法来减少误差。 
默认为1000，表示 1 秒。  
*
srvClock.set_delay(3000); /* 时钟向后延时 3 秒 *

/* 0.5秒刷新一次时间 *
window.setInterval(function(){ 
    document.getElementById("time").innerHTML =  
                                srvClock.get_ServerTime(fmtStr); 
},500); 

//--> 
</script> 
   

 </body> 
</html>
*/ 
// var ServerClock = function(s_year, s_month, s_day, s_hour, s_min, s_sec) {
//         //估计从服务器下载网页到达客户端的延时时间，默认为1秒。 
//         var _delay = 1000;

//         //服务器端的时间 
//         var serverTime = null;
//         if(arguments.length == 0) {
//             //没有设置服务器端的时间，按当前时间处理 
//             serverTime = new Date();
//             _delay = 0;
//         } else {
//             serverTime = new Date(s_year, s_month - 1, s_day, s_hour, s_min, s_sec)
//         };

//         //客户端浏览器的时间 
//         var clientTime = new Date();
//         //获取时间差 
//         var _diff = serverTime.getTime() - clientTime.getTime();

//         //设置从服务器下载网页到达客户端的延时时间，默认为1秒。 
//         this.set_delay = function(value) {
//             _delay = value;
//         };

//         //获取服务的日期时间 
//         this.get_ServerTime = function(formatstring) {
//             clientTime = new Date();
//             serverTime.setTime(clientTime.getTime() + _diff + _delay);
//             if(formatstring == null) {
//                 return serverTime;
//             }else{
//                 return serverTime.format(formatstring);
//             }
//         };
//     }

       
 

/* =-=-=-=-=-=-=-=-=-=-=-= live_info.html =-=-=-=-=-=-=-=-=-=-=-=-= */

// function liveCancel(liveId){
// 	alert('已取消');
// }

$(function(){
	$('.grid_item tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});

	xes.date.clock.start($('#serverTime'));
});