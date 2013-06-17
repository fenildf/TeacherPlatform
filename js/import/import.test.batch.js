/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 批量导入试题
 * project.create.js
 * @update : 2013-1-30
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


/* -------------------- xes.iframe.js --------------------- */

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
			_setHeight();
		}
	};
	f.getUrl = function(){
		var _local = window.location,
			_pathname = _local.pathname;
		return _pathname;
	};
})();
$(function(){

	// setTimeout(function(){
	xes.iframe.setHeight();
	// },100);	
	
	/**
	 * 锚点跳转
	 * 如果url地址中存在锚点“#”则进行跳转
	 */
	var url = window.location.href;
	url = url.split('#');

	if(url.length > 1){
		// 去掉末尾的时间戳
		var n = url[1].split('?');
		n = n[0];
		goAnchor(n);
	}

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
};
/**
 * 关闭当前激活标签
 * @return {[type]} [description]
 */
var closeActiveTab = function(id){
	window.parent.closeActiveTabs(id);
};
/**
 * 打开标签（表单提交），非链接点击时
 */
var goTab = function(url, title, id, closeSelf){
	if(closeSelf){
		window.parent.getActiveTabs(function(self){
			var closeID = self.attr('id');
			closeID = closeID.replace('tab_','');
			window.parent.goTabs(url, title, id, closeID);
		});

		if(xes.img){
			xes.img.hideView();
		}
	}else{
		window.parent.getActiveTabs(function(self){
			window.parent.goTabs(url, title, id);
		});
	}
}
/**
 * 刷新标签
 */
var refreshTab = function(id){
	// alert(id);
	// console.log(window.location.href);
	// window.parent.refreshTabs(id);
	var url = window.location.href;
	if(url.split('###').length>1){
		url = url.replace(/###$/,'');
	}
	window.location.href = url;
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

//获得iframe的点击事件
var isDomClick = function(fn){
	$(document).unbind('click').click(function(event){
		if(fn){
			fn(event);
		}else{
			return event;
		}
	});
};

var unDomClick = function(){
	$(document).unbind('click');
};

/**
 * 跳转到锚点
 * @param  {[type]} name 锚点id
 * @return {[type]}      [description]
 */
function goAnchor(name){
	var dom = $('#'+name);
	if(dom.length > 0){
		var top = dom.offset().top;
		window.parent.setScrollTop(top);
	}
}

/* -------------------- ui/xes.ui.tips.js --------------------- */
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
			xes.tips = xes.ui.tips;
		});
	}
})(xes);


/* -------------------- xes.form.js --------------------- */
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
			// var ifChecked = $('input[type="checkbox"][id="checkAll"]').attr('checked');
			var ifChecked = $('input[type="checkbox"][id="checkAll"]')[0].checked;
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
				var checked = $(this).attr('checked');
				if(checked == false || checked == undefined) {
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
		* 复选框选择(根据复选框的值 选中复选框)
		* @example
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="2">
		*			<input type="checkbox" id="checkbox[]" name="checkbox[]" value="3">
		*
		*			<a href="javascript:void(0);" onclick="checkBoxes('checkbox[]', '2,3'); return false;">复选框选择</a>
		*
		* @param string cbs_name 复选框name
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.setCheckBox = function (cbs_name, cbs_values) {
			$.each($('input[type="checkbox"][name="' + cbs_name + '"]'), function() {
				$(this).attr('checked', false);
			});
			$.each(cbs_values.split(','), function(i, n) {
				$('input[type="checkbox"][name="' + cbs_name + '"][value="' + n + '"]').attr('checked', true);
			});
		}

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
		* 获取相同name的input文本框的值,以逗号隔开
		* @example
		*			<input type="text" id="checkbox[]" name="checkbox[]" value="1">
		*			<input type="text" id="checkbox[]" name="checkbox[]" value="2" checked>
		*			<input type="text" id="checkbox[]" name="checkbox[]" value="3" checked>
		*
		*			<a href="javascript:void(0);" onclick="alert(getCheckedValue('checkbox[]')); return false;">复选框选择</a>
		*
		* @param string cbs_ids 复选框id
		* @param string cbs_values 要选择的复选框的值,以半角逗号隔开
		* @return
		*/
		f.getInputsValue = function (cbs_id) {
			var values = '';
			$.each($('input[name="' + cbs_id + '"]'), function() {
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
			var box = $('#'+tableid).find('input:checkbox');
			var checkboxName = box.attr('name');
			// 获取已有的cookie值
			var cookieVal = $.cookie(tableid);
			if(cookieVal && cookieVal != ''){
				//根据cookie值设置已选项
				f.setCheckBox(checkboxName, cookieVal);
			}	
	 		box.click(function(){
	 			f.setCheckedValue(tableid, this);
	 		});
			// if(name==''){name = 'checkvalue';}
			// //cookie中存放的值
			// var cookievalue = $.cookie(name);
			// if(cookievalue==null){
			// 	cookievalue = ',';
			// }
			// $.each($('table[id='+tableid+'] tr input[type="checkbox"]'),function (){
			// 	var indexof = cookievalue.indexOf(','+$(this).val()+',');
			// 	if(indexof>=0){
			// 		$(this).attr('checked',true);
			// 	}
			// });

			// $('table[id='+tableid+'] tr input[type="checkbox"]').click(function(){

			// 	//点击checkbox的值
			// 	var checkedvalue = $(this).val();
			// 	//方便搜素特殊处理的值
			// 	//var searchvalue = ','+$.cookie(name);
			// 	//如果checkbox为选中状态
			// 	if($(this).attr('checked') === 'checked'){
			// 		//查找选中checkbox值在cookie中是否存在
			// 		var indexof = cookievalue.indexOf(','+checkedvalue+',');
			// 		//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
			// 		if(indexof == -1){
			// 			//将指定的值添加到cookie中
			// 			cookievalue = cookievalue+checkedvalue+',';
			// 		}
			// 	}

			// 	//如果checkbox为未选中状态
			// 	if($(this).attr('checked') != 'checked'){
			// 		//查找选中checkbox值在cookie中是否存在
			// 		var indexof = cookievalue.indexOf(','+checkedvalue+',')
			// 		//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
			// 		if(indexof >=0 ){
			// 			//删除cookie中指定的值
			// 			cookievalue = cookievalue.replace(','+checkedvalue+',' , ',');

			// 		}
			// 	}
			// 	$.cookie(name, cookievalue, { expires: 0 });
			// 	// cookievalue = ',';
			// });
			
		};

		// 把tableCheckbox选中的值（cookie里面的）转化为数组格式
		f.getCheckboxValue = function (cookieName){
			var arr = $.cookie(cookieName);
			if(arr){
				arr = arr.replace(/^,/,'').replace(/,$/,'');
				return arr;
			}else{
				return false;
			}
		};
		/*
		 * input表单默认值的显示与隐藏
		 * 获取焦点的时候隐藏默认提示信息，失去焦点的时候，如果是空值则显示默认提示信息
		 */
		f.defaultValue = function(){
			var placeholder = '';
			$("input:text").focus(function () { 
				this.defaultValue = $(this).attr('placeholder') || '';
				var check1 = $(this).val(); 
				if (check1 == this.defaultValue) { 
					$(this).val(''); 
				}
				$(this).attr('placeholder','');
			}); 
			$("input:text").blur(function () {
				var d = this.defaultValue || '';
				var check1 = $(this).val(); 
				if (check1 == '') { 
					$(this).attr('placeholder', d); 
				}
			}); 
			
		};

		/**
		 * 根据点击checkbox设置cookie值
		 * @param  {string} id 存储已选值的cookiename，同时也是checkbox外围容器的id名
		 * @param {DOM} box 点击的checkbox对象 this
		 * 
		 */
		f.setCheckedValue =	function (cookiename,box){

 			// 获取已有的cookie值
 			var _cookieval = $.cookie(cookiename);

 			// 将cookie值转化为数组；
 			var _values = (_cookieval && _cookieval != '') ? _cookieval.split(',') : [];

 			// 去除数组中的空白项（原来方法里面里面开头的“，”）
 			_values = $.grep(_values, function(n) {return $.trim(n).length > 0;})

 			// 选中状态
			// var __checked = $(box).attr('checked');
			var __checked = box.checked;

			// 当前点击对象的值
			var __val = box.value;

			// 查看当前选中的值在cookie中是否存在，返回其索引值，0开头
			var __index = $.inArray(__val, _values);

			/**
			 * 如果选中，且cookie中不存在，则添加
			 * 如果取消选中，且cookie里存在，则删除
			 */
			if( __checked && (__index == -1) ){

				_values.push(__val);

			}else if( !__checked && (__index >= 0)){

				_values.splice(__index,1);

			}

			$.cookie(cookiename, _values);

		}

		/**
		 * 清除checkbox的已选项
		 * @param  {string} id 存储已选值的cookiename，同时也是checkbox外围容器的id名
		 * @return {[type]}            [description]
		 */
		f.emptyChecked = function(id){
			var _val = $.cookie(id);
			if(_val){
				_val = (_val !='') ? _val.split(',') : [];
				if(_val.length > 0 ){
					var _checkbox = $('#'+id).find('input[type="checkbox"]');
		 			_checkbox.each(function(){
		 				// var _v = $(this).val();
		 				var _v = this.value;
		 				if( $.inArray(_v , _val) > -1){
		 					this.checked = false;
		 				}
		 			});
				}
				$.cookie(id, null);
			}
		}

		/**
		 * checkbox的点击事件
		 * @param  {string} id 存储已选值的cookiename，同时也是checkbox外围容器的id名
		 * @param  {string} checkboxName [checkbox的name值]	
		 * @return {[type]}              [description]
		 */
		f.checkboxClick = function(id,checkboxName){
			var box = $('#'+id).find('input:checkbox');
			var checkboxName = box.attr('name');
			// 获取已有的cookie值
			var cookieVal = $.cookie(id);
			if(cookieVal && cookieVal != ''){
				//根据cookie值设置已选项
				f.setCheckBox(checkboxName, cookieVal);
			}	
	 		$('#'+id).find('input:checkbox').click(function(){
	 			f.setCheckedValue(id, this);
	 		});
		};

		

})();


xes.form = xform;


// 把tableCheckbox选中的值（cookie里面的）转化为数组格式
// function getCheckValue(cookieName){
// 	var arr = $.cookie(cookieName);
// 	if(arr){
// 		arr = arr.replace(/^,/,'').replace(/,$/,'');
// 		return arr;
// 	}else{
// 		return false;
// 	}
// }



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

/**
 * 设置知识树联动
 * @param {[type]} department_id [学部id]
 * @param {[type]} subject_id    [学科id]
 */
function setKnowledge(department_id,subject_id){
	if(knowledge_params){
		//修改学部
		if(department_id){
			knowledge_params['department_id'] = department_id;
		}
		//修改学科
		if(subject_id){
			knowledge_params['subject_id'] = subject_id;
		}
		//初始化
		if(initSelects){
			initSelects(knowledge_params);
		}
	}
}

// /import:xes.img.js/ //

/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2013-06-07 00:19:20
 * @version $Id$
 */

/**
 * localstorage
 *
 * 本地存储
 * @authors Marco
 * @date    2013-05-27 17:50:59
 * @version $Id$
 */

var xes = xes || {};

xes.LocalStorage = xes.LocalStorage || {};
(function() {
	var ls = xes.LocalStorage;
	ls.set = function(k, v) {
		var _val = (typeof(v) === "object") ? JSON.stringify(v) : v;
		window.localStorage.setItem(k, _val)
	};
	ls.get = function(k) {
		var v = window.localStorage.getItem(k);
		v = JSON.parse(v);
		return v
	};
	ls.del = function(k) {
		window.localStorage.removeItem(k)
	}
})();


/* -------------------- xes.knowledge.js --------------------- */
 
/**
 * knowledge
 *
 * 知识点
 * @authors Marco
 * @date    2013-05-27 17:50:59
 * @version $Id$
 */

var xes = xes || {};

///import:xes.localstorage.js///

xes.LocalStorage = xes.LocalStorage || {};
(function() {
	var ls = xes.LocalStorage;
	ls.set = function(k, v) {
		var _val = (typeof(v) === "object") ? JSON.stringify(v) : v;
		window.localStorage.setItem(k, _val)
	};
	ls.get = function(k) {
		var v = window.localStorage.getItem(k);
		v = JSON.parse(v);
		return v
	};
	ls.del = function(k) {
		window.localStorage.removeItem(k)
	}
})();


xes.know = xes.know || {};

(function(){
	var k = xes.know;

	/**
	 * 学部ID
	 * @type {Number}
	 */
	k.department = 0;

	/**
	 * 学科ID
	 * @type {Number}
	 */
	k.subject = 0;

	k.HTML = '';

	k.json = {};

	/**
	 * 知识点容器
	 * @type {String | jQuery}
	 *   
	 * @example <span class="knowledge_items"></span>
	 *
	 * 当点击知识点之后，此容器存储的是点击节点的父级容器
	 */
	k.wrap = '.knowledge_box';

	/**
	 * 知识点组外围容器的样式
	 * @type {String}
	 */
	k.items = '.knowledge_box';

	/**
	 * 知识点DOM
	 * @type {String}
	 * @example 
	 * <span class="knowledge_items">
	 * 		<select></select>
	 * 		<select></select>
	 * </span>
	 */
	k.item = '.knowledge_box select';

	k.url = 'http://teacher.com/knowledge.php?level=';

	/**
	 * 获取当前点击的知识点的索引值（level）
	 * 
	 * @return {[type]} [description]
	 */
	k._getIndex = function(dom){
		// alert($(k.items).index(DOM));
		var index = $(dom).parent().children().index(dom)
		return Number(index) + 1;
	};

	/**
	 * 获取知识点数据
	 * @return {[type]} [description]
	 */
	
	/**
	 * 获取知识点数据
	 * @param  {Number} level 级别
	 * @param  {Number} pid   父级ID
	 * @param  {Function} func  回掉函数
	 * @return {[type]}       [description]
	 *
	 * 可以有两种调用方式：
	 *
	 * 1. 通过回掉函数：
		 	k._getData(level, pid, function(data){
				k._createHTML(data, level)._append(level);
			});
		2. 直接调用：
			k._getData(level, pid);

	 */
	k._getData = function(level, pid, func){

		/**
		 * 判断本地存储中是否有数据，如果有直接把数据传入处理函数(_operateData)中,
		 * 否则ajax获取数据后存储本地存储，然后再调用处理函数(_operateData)
		 */
		var localData = xes.LocalStorage.get('knowledge_' + level);
		if(localData){
			_operateData(localData);
		}else{
			//如果超出5级则不再请求
			if(level < 5){
				$.ajax({
					url		: k.url + level,
					dataType: 'jsonp',
					jsonp	: 'jsonCallback',
					timeout	: 6000,
					success	: function(json) {
						//如果不是object则格式化数据
						if(typeof(json) != 'object'){
							var json = JSON.parse(json);
						}
						xes.LocalStorage.set('knowledge_'+level, json);
						_operateData(json);
					},
					error	: function() {
						alert('数据读取错误..');
					}
				});	
			}else{
				return this;
			}
			
		}

		/**
		 * 处理json数据
		 * @param  {json | string} data [可以是Json格式，也可以是序列化的字符串]
		 * 
		 * @return {[type]}      [description]
		 */
		function _operateData(data){
			
			var json = data;
			json = (pid == 0) ? json : json[pid];

			// 如果没有子节点则不处理
			if(json != undefined){

				if(func){
					func(json);
				}else{
					k._createHTML(json, level)._append(level);
				}

			}
		}

		return this;
	};

	/**
	 * 生成HTML节点
	 * @param  {JSON} data  从数据中筛选出来的JSON数据
	 * @param  {Number} level 级别
	 * @return {Object}       知识点对象：方便链式调用
	 */
	k._createHTML = function(data, level){
		var dom = '<select name="level_' + level + '_id">'
				+ '<option value="">--选择知识点--</option>';
		$.each(data, function(key, val){
			if(k.department == 0 && k.subject == 0){
				dom += '<option value="'+ key +'">' + val['name'] + '</option>';
			}else if(k.department == val['department_id'] && k.subject == val['subject_id']) {
				dom += '<option value="'+ key +'">' + val['name'] + '</option>';
			}

		});
		dom += '</select>';
		
		//存储到变量中
		k.HTML = dom;

		return this;
	};

	/**
	 * 在页面中插入知识点节点
	 * @param  {Number} level 传入的是将要生成的级别数，需要-1来获取上一个级别数(要插入的级别，在父级之后插入)
	 * @param  {String} html  要插入的HTML
	 * @return {object}       知识点对象，方便链式调用
	 */
	k._append = function(level, html){
		//这里需要的是上一级的级别数
		var level = Number(level) - 1;
		var html = html || k.HTML;

		//如果不是1级，则先清空后面的，然后追加
		if(level > 0){
			//由于eq是从0开始算起的，所以要-1；
			$(k.item).eq(level-1).nextAll().remove();
			$(k.item).eq(level-1).after(html);	
		}else{
			$(k.items).html(html);
		}
		
		return this;
	};


	/**
	 * 创建select节点：通过_createHTML 和 _append两个方法
	 * @param  {Number} level 级别
	 * @param  {Number} pid   父级id
	 * @return {[type]}       [description]
	 *
	 * @example :
	 		1. 可以用下面回掉函数的方式
				k._getData(level, pid, function(data){
			 		k._createHTML(data, level)._append(level);
				});

			2. 也可以直接调用: k._getData(level, pid);
	 */
	k.create = function(level, pid){
		var pid = pid || 0;

		// 直接调用
		k._getData(level, pid);

		return this;
	};

	/**
	 * 移除知识点
	 * @return {[type]} [description]
	 */
	k.remove = function(){};

	/**
	 * 复制知识点
	 * @return {[type]} [description]
	 */
	k.clone = function(from, to){};

	/**
	 * 获取选中的值
	 * @return {[type]} [description]
	 */
	k.getValue = function(){};

	/**
	 * 设置要选中的值
	 * @return {[type]} [description]
	 */
	k.setValue = function(){};

	/**
	 * 知识点的点击事件
	 * @return {[type]} [description]
	 */
	k.click = function(dom, level){
		//点击后需要将当前元素与父级节点存储到变量中，方便多组知识点同时调用
		k.wrap = $(dom).parent();
		k.item = k.wrap.children();

		k.create(level, dom.value);
	};

	/**
	 * 监听select的change事件
	 * @return {[type]} [description]
	 */
	k.addlistener = function(){

		$(k.wrap).on('change', 'select', function(a){
			var index = k._getIndex(this);
			k.click(this, Number(index) + 1);
		});

		return this;
	};

	/**
	 * 知识点初始化方法
	 * @param  {JSON | String} opt  配置参数，可以是JSON对象；或是字符串：
	 			1. 如果是JSON对象，则只支持：
						 	{
								department 	:0,							// 学部ID
								subject 	:0,							// 学科ID
								wrap 		:'$('.knowledge_box')',		// 存放知识点的容器：可以是选择符，也可以直接是jQuery对象
								items 		:'$('select')',				// 知识点的select组：可以是选择符，也可以是jQuery对象
								url 		:'',						// ajax请求路径
								val 		:[1,2,3,4],					// 默认知识点选中的值（ID）：4位的数组分别代表4个级别，如果没有则用0标识
								func 		:function(know){}			// 初始化后要执行的方法，如果只需要初始化参数可不用写这个回掉
						 	}
				2. 如果是字符串，则直接指定xes.know对应的键，并且下面第二个参数是此键的值；

	 * @param  {String | Function}  val 
	 *                   1. 如果传入的只是string的话，则第一个参数为Key，第二个参数为value；
	 *                   2. 如果是function的话则为回掉函数，可以在这里进行回掉，会返回一个xes.know对象
	 *                   
	 * @param  {Function} func 回掉函数（可不用）：如果不用opt.func的话，可以在这里进行回掉，会返回一个xes.know对象
	 * 
	 * @return {[type]}      [description]
	 */
	k.init = function(opt, v, func){

		//判断opt的类型
		var tp = typeof(opt);

		/**
		 *  判断第二个参数是否为回调函数：
		 *  true : 回调函数
		 *  false: 第一个参数的值
		 *  
		 */
		var isCallback = (typeof(v) == 'function');

		//覆盖原有设置
		if(tp == 'object'){
			$.each(opt, function(key, val){
				k[key] = val;
			});
		//如果v不是回调，并且 opt 是字符串，则直接给xes.know里面指定的键赋值
		}else if(!isCallback && tp == 'string'){
			k[opt] = v;
		}
		
		//初始化创建第一级节点
		k.create(1);

		/**
		 * 初始化后要执行的方法
		 *
		 * 返回xes.know对象
		 */
		if(opt.func){
			opt.func(k);
		}

		//如果有回调则执行回调函数，返回xes.know对象，否则直接返回xes.know对象
		if(isCallback){
			v(this);
		}else{
			return this;
		}

	};

})();



/**
 * 知识点调用样例：
 * 1. 初始化：
		xes.know.init({
			department:2,
			subject:2,
			func : function(a){
				// console.log(a);
				// a.create(1);
				a.addlistener();
			}
		}); 

	2. 初始化之后，需要重新设置参数：
	xes.know.init({
		department:2,
		subject:2,
	});
 */



/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */


$(function () {
	$('#paper_type').change(function(){
		var _txt = $('#paper_type option:selected').text();
		if(this.value==2 || _txt == '考试卷'){
			$('.paper_type_box').show();
			$('.question_score').show();

		}else{
			$('.paper_type_box').hide();
			$('.question_score').hide();
		}
	});

	$('.questions_type_button').change(function(){
		var n = $(this).attr('name').replace('testType_','');
		if(this.value == 1){
			$('#questions_type_checkbox_'+n).show().siblings('.questions_type').hide();
		}else{
			$('#questions_type_input_'+n).show().siblings('.questions_type').hide();
		}
	});

	// 选择学部
	$('#departmentId').change(function(){
		$('.choose').html('');

		/**
		 * 两种方法初始化知识点：
		 *
		  	1. 传入object：
		  		xes.know.init({
					department: $(this).val()
				});
			2. 直接将键、值当2个参数传入进去：	xes.know.init('department', $(this).val());
		 */		
		xes.know.init('department', $(this).val());
	});

	// 选择学科
	$('input[type="radio"][name="subjectId"]').click(function(){
		$('.choose').html('');
		xes.know.init('subject', $(this).val());
	});
	
	xes.iframe.setHeight();
});

function getQuestionListDom(d,id){
	var _html = '';
	var _list = $('.choose div[id^="question_id_"]');
	var _before = id ? $('#question_id_'+id) 
					 : _list.length == 0 ? $('.choose') 
					 					 : _list.last();
	$.each(d,function(k,v){
		var _t = v.test_name,
			_id = v.id,
			_url = v.test_content;
		if($('#question_id_'+_id).length > 0){
			alert('《'+_t+'》这道题已经添加过了，请勿重复添加!');
			return;
		}
		_html += '<div id="question_id_' + _id + '" class="choose_list">'
		+'		<span class="question_num"><em>3</em>.</span>'
		+'		<table>'
		+'			<colgroup>'
		+'				<col width="20%">'		
		+'				<col width="30%">'		
		+'				<col width="50%">'
		+'			</colgroup>'
		+'		<tbody><tr class="question_data">'
		+'			<td>ID:<em class="question_data_id">' + _id + '</em></td>'
		+'			<td>名称：<em>' + _t + '</em></td>'
		+'			<td><em onmouseover="xes.img.hoverView(\''+ _url +'\'	,this);" onmouseout="xes.img.hideView();" class="imgView">' + _url + '</em></td>'
		+'		</tr>'

		+'	</tbody></table>'
		+'	<span>'
		+'		<a onclick="selectTestQuestions(\'' + _id + '\')" href="###">追加</a>'
		+'		<a onclick="deleteTestQuestions(\'' + _id + '\')" href="###">删除</a>'
		+'	</span>';

		if($('#paper_type').val()==1){
			_html +='	<span class="question_score" style="display:none;">';
		}else{
			_html +='	<span class="question_score">';
		}
		
		_html +='		分值：'
		+'		<input type="text" class="input_text question_data_score" value="" size="">'
		+'	</span>'
		
		+'</div>';
	});

	if(_list.length > 0){
		_before.after(_html);
	}else{
		$('.choose').html(_html);
	}
	setQuestionListNum();
	xes.iframe.setHeight();
}

/**
 * 重新计算序列号
 */
function setQuestionListNum(){
	var _list = $('.choose div[id^="question_id_"]');
	_list.each(function(i){
		$(this).find('.question_num em').text((i+1));
	});
}


function deleteQuestion(id){
	if(id){
		$('#question_id_'+id).remove();
		setQuestionListNum();
	}

}
//获取总分
function getAllScore(){
	var _list = $('.question_data_score:visible');
	var _s = 0;
	if(_list.length>0){
		_list.each(function(){
			_s += Number($(this).val());
		});
	}
	return _s ;
}

//获取试题信息
function getQuestionListValue(){
	var _list = $('.choose div[id^="question_id_"]');
	var _v = [];
	if(_list.length > 0 ){
		_list.each(function(){
			var d = $(this);
			var v = {
				'order_num':d.find('.question_num em').text(),
				'test_id':d.find('.question_data_id').text(),
				'score':Number(d.find('.question_data_score').val())
			};
			_v.push(v);
		});
	}
	return JSON.stringify(_v);
}

/* 试题页面：*/

/**
 * 追加填空题
 */
function addFillCorrectAnswer(d){
	var _wrap = $(d).parent();

	var _html = '<span><input type="text" value="" name="fillCorrectAnswer[]" class="input_text w130">\n'
			  + '<a href="###" onclick="addFillCorrectAnswer(this);">追加</a>\n'
			  + '<a href="###" onclick="removeFillCorrectAnswer(this);">删除</a></span>';
	_wrap.after(_html);
}

function removeFillCorrectAnswer(d){
	var _wrap = $(d).parent();
	var _list = _wrap.parent().find('span');
	if(_list.length > 1){
		_wrap.remove();
	}else{
		alert('至少要有一个正确答案');
	}
}

/* =-=-=-=-=-=-=-=-=-=-=-= 编辑导入试题部分 =-=-=-=-=-=-=-=-=-=-=-=-= */


// var batch = {
// 	name:'试卷名称',
// 	type:'试卷类型',
// 	time:'答题时间',
// 	total:'试卷总分',
// 	department:'学部',
// 	subject:'学科',
// 	description:'描述',
// 	items:{
// 		'1001':{
// 			id:'',
// 			num:'1',
// 			content:'http://...jpg',
// 			answerAnalysis:'解析',
// 			title:'试题名称',
// 			keyword:'关键字',
// 			customDifficulty:'系数',
// 			knowledge:[2,3,2],
// 			type:'试题类型',
// 			questions_type_checkbox:[1,2,4,8]/*'正确答案'*/,
// 			score:'分值'

// 		}
// 	}
// };


/**
 * 试题列表折叠
 * expanded / collapsed 
 */
function itemAaccordion(dom,tp){
	var item = $(dom).find('.item_body');
	if(tp == 'collapsed'){
		item.addClass('item_collapsed');
	}else{
		item.removeClass('item_collapsed');
	}
}

//试题单个点击展开/折叠
function itemToggle(dom, tp){
	if(tp == 'collapsed'){
		dom.addClass('collapsed');
	}else{
		dom.removeClass('collapsed');
	}
}

//整体展开/折叠
function itemsToggle(dom, tp){
	if(tp == 'collapsed'){
		dom.removeClass('items_collapsed').addClass('items_expanded');
		dom.text('展开');
	}else{
		dom.removeClass('items_expanded').addClass('items_collapsed');
		dom.text('收起');
	}
}

$(function(){
	//试题单个点击展开/折叠
	$('ul.labelCon li .question_item').on('click','dt', function(){
		var box = $(this).parent();
		
		if(box.hasClass('collapsed')){
			itemToggle(box, 'expanded');
		}else{
			itemToggle(box, 'collapsed');
		}

		//当单个全部收起或者展开时，整体的那个按钮样式和文字的修改
		var items = $('ul.labelCon li .question_item');
		var collapsed = $('ul.labelCon li dl.collapsed');
		var handle = $('.question_handle_btn');
		if(items.length == collapsed.length){
			handle.removeClass('items_collapsed').addClass('items_expanded');
			handle.text('展开');
		}
		if(collapsed.length == 0){
			handle.removeClass('items_expanded').addClass('items_collapsed');
			handle.text('收起');
		}
	});

	//整体展开/折叠
	$('.question_handle_btn').on('click', function(){
		var collapsed = $(this).hasClass('items_collapsed');
		var items = $('ul.labelCon li .question_item');
		if(collapsed){
			itemToggle(items, 'collapsed');
			itemsToggle($(this), 'collapsed');
		}else{
			itemToggle(items, 'expanded');
			itemsToggle($(this), 'expanded');
		}
	});

	//单个移出
	$('ul.labelCon li .question_item').on('click', '.item_delete', function(){
		if(confirm('是否确定删除')){
			$(this).parents('.question_item').remove();
		}
	});

	// 选择试卷类型
	$('#paper_type').on('change', function(){
		if(this.value == 2){
			$('.question_item').removeClass('test_paper');
		}else{
			$('.question_item').addClass('test_paper');
		}
	});

	/**
	 * 应用所有知识点
	 *
	 * 一共有3步：
	 * 		1. 获取当前要应用的知识点组
	 * 		2. 获取里面每个节点的值，将其存入到数组中
	 * 		3. 复制节点到所有知识点容器中
	 * 		4. 根据数组里面存储的值，设置所有知识点节点的选中状态
	 * 		
	 * @return {[type]} [description]
	 */
	$('.knowledge_setall').on('click', 'button,input', function(){
		// 存储以选中的知识点状态指：数组索引就是知识点的级别：1级对应的是v[0]，2级对应的是v[1];
		var v = [];
		var p = $(this).parent().prev();

		// 遍历当前点击“应用所有”按钮所属的知识点组里面的节点，将选中的值存储到数组中
		p.find('select').each(function(){
			v.push(this.value);
			$(this).find('option[value="' + this.value + '"]').attr('checked',true);
		});
		
		// 复制到所有的知识点容器中
		$('.knowledge_box').html(p.html());

		/**
		 * 设置select的选中状态
		 * 先循环有多少个知识点组，再遍历里面的知识点节点
		 * @return {[type]} [description]
		 */
		$('.knowledge_box').each(function(){
			$(this).find('select').each(function(i){
				this.value = v[i];
			});
		});

	});


	// 页面加载之后第一次初始化知识点
	xes.know.init({
		department:2,
		subject:2
		// url:'http://www.wss2.0.com/coursev4/knowledge/'
	}).addlistener();

});



/* --------------------- 表单验证部分 -------------------- */

var batchTest = batchTest || {};

/**
 * 所有测试题表单值
 * @type {Object}
 * {
 *  	'serialNumber': {
			id 				: 1,
			serialNumber 	: 1,
			testName 		: '试题名称',
			testType 		: '试题类别',			
			correctAnswer 	: [1,2,4,8],		// 试题答案
			knowledgePoint 	: [1, 1.1, 11],		// 知识点
			testContent 	: 'http://xueersi.com/试题题干.jpg',
			answerAnalysis 	: 'http://xueersi.com/试题解析.jpg',
			customDifficulty: 0.1,				// 难度系数
			keyword 		: 'wfca',			// 关键字
			analysisVideo 	: 10005,			// 解析视频ID
			testpaperScore 	: 10 				// 试题分数
		},
		{2:{}},
		{3:{}}
	}
 */
batchTest.items = {};

/**
 * 获取批量试题的表单值
 * @return {JSON} 返回整个试题数组;
 *
 *
 * o = {
			serial : d.serial.val(),
			score  : d.score.val(),
			type   : d.type.val(),
			name   : d.name.val(),
			content: d.content.text(),
			analysis : d.analysis.text(),
			knowledge: [],
			answer : [],
			keyword: d.keyword.val(),
			difficulty: d.difficulty.val(),
			video  : d.video.val()
		};
 */
batchTest.getValue = function(){

	var paperType = $('#paper_type').val();

	var items = $('.question_items dl');

	var dom, tpbox, tp, num, answerBoxType, answerItems, num, d, o, itemData, answer, error, score = 0;
/*
	var testpaperScore = $('input[name="testpaperScore"]:checked:visible');

	var paperScore = testpaperScore.length > 0 ? testpaperScore.val() : 0;

	paperScore = Number(paperScore);
*/

	var paperScore = 0;

	if(paperType == 2){
		paperScore = Number($('input[name="testpaperScore"]:checked').val());
	}
	




	

	items.each(function(){

		dom = $(this);

		// 获取当前item的索引值
		num = dom.attr('id').replace('question_item_','');

		error = [];

		d = {
			serialNumber : dom.find('.item_num input'),
			testpaperScore  : dom.find('.item_sorce input:visible'),
			testType   : dom.find('input[name^="testType_"]:checked'),
			testName   : dom.find('.item_title input'),
			content: dom.find('.item_pic .imgView').eq(0),
			analysis : dom.find('.item_pic .imgView').eq(1),
			keyword: $('#keyword_' + num),
			difficulty: $('#customDifficulty_' + num),
			video  : $('#analysisVideo_' + num)
		};


		o = {
			serialNumber : d.serialNumber.val(),
			testpaperScore  : d.testpaperScore.val(),
			testType   : d.testType.val()
		};

		// 检测：序号、分值、类型
		$.each(o, function(k, v){
			if(v == ''){
				errorSet(d[k]);
			}else{
				errorClear(d[k]);
			}
		});

		o.testName 		 = dom.find('.item_title input').val();
		o.keyword 	 = $('#keyword_' + num).val();
		o.customDifficulty = $('#customDifficulty_' + num).val();
		o.analysisVideo 	 = $('#analysisVideo_' + num).val();
		o.testContent = d.content.text();
		o.answerAnalysis = d.analysis.text();


		/**
		 * 处理试题分数的值 -------------------------------------------------- 
		 */
		// 如何是考试卷，则试题分值累加
		if(paperScore > 0){
			score += Number(o.testpaperScore);
		}

		/**
		 * 处理试题答案的值 -------------------------------------------------- 
		 */

		// 试题类型
		tp = d.testType.val();

		o.testType = tp;

		// 答案数组
		answer = [];

		if(o.testType == ''){
			errorSet(d.testType, '请选择试题类型');
		}else{
			errorClear(d.testType);
		}

		// 答案类型：如果是1则为选择题，否则为填空
		answerBoxType = (tp == 1) ? 'checkbox_' + num : 'input_' + num;

		// 存储答案的容器
		d.answer = dom.find('#questions_type_' + answerBoxType).find('input');

		// 如果是1则为选择题，只把选中的值存入数组中
		if(tp == 1){
			d.answer.each(function(){
				if(this.checked){
					answer.push(this.value);
				}
			});
		}else{
			d.answer.each(function(){
				answer.push(this.value);
			})
		}
		// 将答案存到o对象中
		o.correctAnswer = answer;

		if(o.correctAnswer.length == 0){
			errorSet(d.answer, '请填写试题答案');
		}else{
			errorClear(d.answer);
		}


		/**
		 * 处理知识点的值 ----------------------------------------------- 
		 */
		
		o.knowledgePoint = [];

		// 知识点选择器
		d.knowledge = dom.find('.knowledge_box select');

		// 循环知识点，将已选中的值存入数组中
		d.knowledge.each(function(){
			if(this.value){
				o.knowledgePoint.push(this.value);
			}
		});

		if(o.knowledgePoint.length == 0){
			errorSet(d.knowledge, '请选择知识点');
		}else if(o.knowledgePoint.length < 2){
			errorSet(d.knowledge, '最少需要选择2级知识点');
		}else{
			errorClear(d.knowledge);
		}


		/**
		 * 设置错误提示
		 * @param  {jQuery Object} d   出错的表单元素
		 * @param  {String} msg 错误提示
		 * @return {[type]}     [description]
		 */
		function errorSet(d, msg){
			d.addClass('error');
			d.parents('div').addClass('wrap_error');
			error.push(d);
			// if(msg){}
		}

		// 清除错误提示
		function errorClear(d){
			d.parents('div').removeClass('wrap_error');
			d.removeClass('error');
		}

		/**
		 * 检查每道题的错误情况
		 * 检测如果error数组中有错误元素，则在父级增加错误效果，否则检测通过,这是成果样式
		 */
		if(error.length > 0){
			$('.question_items dl').find('.item_body').removeClass('check_error');
			dom.find('.item_body').addClass('check_error');
			alert('请检查第 ' + (Number(num)+1) + ' 道试题标红线的内容是否填写完整');
			return false;
		}else{
			dom.find('.item_body').addClass('check_succeed');
			// o = $.parseJSON(o);
			// console.log(o);
			//将数据存储到batchTest.items当中，以serialNumber为键
			batchTest.items[o.serialNumber] = o;
		}

	});



	/**
	 * 数据验证，如果出错，则直接 return false
	 * 
	 */

	// 如何是考试卷，则判断试题分值总和是否大于试卷分值
	if(paperScore > 0){
		if(score > paperScore){
			alert('您的试题分值总数大于试卷分值');
			return false;
		}
	}

	// var json = $.parseJSON(batchTest.items);
	var jsons = JSON.stringify(batchTest.items);
	if(error.length > 0){
		return false;
	}else{
		// return batchTest.items;
		return jsons;
	}
};



// 试卷



// 试题











