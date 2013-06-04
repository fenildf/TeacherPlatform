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
 * knowledge
 *
 * 知识点
 * @authors Marco
 * @date    2013-05-27 17:50:59
 * @version $Id$
 */

var xes = xes || {};

xes.knowledge = xes.knowledge || {};
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

(function(){
	var k = xes.knowledge;
	//知识点容器集合
	k.box = '.knowledge_box';
	k.departmentID = 0;
	k.subjectID = 0;
	k.params = {};
	k.setParams = function(json){
		var knowledge = {
			// ajax请求数据地址
			'url':	'http://www.wss2.0.com/coursev4/knowledge/',
			// 联动容器id
			'container_id': 'knowledge',
			// 知识点一级类别标识
			'level_1_id': 'knowledgePoint1Id',
			// 知识点一级类别默认值
			'level_1_default': '',
			// 知识点二级类别标识
			'level_2_id': 'knowledgePoint2Id',
			// 知识点二级类别默认值
			'level_2_default': '',
			// 知识点三级类别标识
			'level_3_id': 'knowledgePoint3Id',
			// 知识点三级类别默认值
			'level_3_default': '',
			// 知识点四级类别标识
			'level_4_id': 'knowledgePoint4Id',
			// 知识点四级类别默认值
			'level_4_default': '',
			// 显示层级
			'level': 4,
			// 学部
			'department_id': k.departmentID,
			// 学科
			'subject_id': k.subjectID
		};
		k.params = knowledge;
		return this;
	};

	k.config = function(){

	};

	k.init = function(json){
		initSelects(k.params);	
	};

	k.checkData = function(params, pid, level){
		var pid = Number(pid);
		var box = $('#' + params['level_'+(level-1)+'_id']);
		if(pid == '') {
			// 如果没有选择一级,则删除二,三,四级下拉框
			box.nextAll('select').remove();
		} else {
			
			var _json = xes.LocalStorage.get('k'+level);

			// var a2 = xes.LocalStorage.get('k2');
			if(_json){
				setDom(_json, pid, level);
			}else{
				$.ajax({
					url		: params.url + level,
					dataType: 'jsonp',
					jsonp	: 'jsonCallback',
					timeout	: 6000,
					success	: function(json) {
						xes.LocalStorage.set('k'+level, json);
						setDom(json, pid, level);
					},
					error	: function() {
						alert('数据读取错误..');
					}
				});
			}
		}
	};

	k.dropdown = {
		1 : function(){},
		2 : function(){
			k.checkData('', '', 2);
		},
		3 : function(){
			k.checkData('', '', 3);
		},
		4 : function(){}
	};

})();

xes.knowledge.setParams();

function setSelect(params, pid, level){
	var str = '&nbsp;';
	str += '<select id="' + params['level_'+level+'_id'] + '" name="' + params['level_'+level+'_id'] + '">';
	str += '<option value="" selected>--选择知识点--</option>';

	$.each(result[pid], function(i, j) {
		if (params.department_id == 0 && params.subject_id == 0) {
			if (params['level_'+level+'_default'] != '') {
				str += '<option value="' + i + '"';
				if (params['level_'+level+'_default'] == i) {
					str += ' selected ';
					if (params['level_'+(level+1)+'_default'] != '') {
						// initSelects_3(params, i);
						xes.knowledge.checkData(params, i, level+1);
					}
				}
				str += '>' + j['name'] + '</option>';
			} else {
				str += '<option value="' + i + '">' + j['name'] + '</option>';
			}
		}else{
			if (params.department_id == j['department_id'] && params.subject_id == j['subject_id']) {
				if (params['level_'+level+'_default'] != '') {
					str += '<option value="' + i + '"';
					if (params['level_'+level+'_default'] == i) {
						str += ' selected ';
						if (params['level_'+(level+1)+'_default'] != '') {
							// initSelects_3(params, i);
							xes.knowledge.checkData(params, i, level+1);

						}
					}
					str += '>' + j['name'] + '</option>';
				} else {
					str += '<option value="' + i + '">' + j['name'] + '</option>';
				}
			}
		}
	});
	str += '</select>';
	box.nextAll('select').remove();
	box.after(str);
	box.next('select').bind("change", function() {
		// initSelects_3(params, $(this).val());
		xes.knowledge.checkData(params, $(this).val() , level+1);

	});
}

function setDom(result, pid, level){
	var level = Number(level);
	var params = xes.knowledge.params;
	var val = level == 1 ? result : result[pid];
	var box = $('#' + params['level_'+(level-1)+'_id']);
	// 如果有子类别,则显示
	if (params.level>=level && result[pid] && result[pid] != '') {
		var str = '&nbsp;';
		str += '<select id="' + params['level_'+level+'_id'] + '" name="' + params['level_'+level+'_id'] + '">';
		str += '<option value="" selected>--选择知识点--</option>';

		$.each(val, function(i, j) {
			if (params.department_id == 0 && params.subject_id == 0) {
				if (params['level_'+level+'_default'] != '') {
					str += '<option value="' + i + '"';
					if (params['level_'+level+'_default'] == i) {
						str += ' selected ';
						if (params['level_'+(level+1)+'_default'] != '') {
							// initSelects_3(params, i);
							xes.knowledge.checkData(params, i, level+1);
						}
					}
					str += '>' + j['name'] + '</option>';
				} else {
					str += '<option value="' + i + '">' + j['name'] + '</option>';
				}
			}else{
				if (params.department_id == j['department_id'] && params.subject_id == j['subject_id']) {
					if (params['level_'+level+'_default'] != '') {
						str += '<option value="' + i + '"';
						if (params['level_'+level+'_default'] == i) {
							str += ' selected ';
							if (params['level_'+(level+1)+'_default'] != '') {
								// initSelects_3(params, i);
								xes.knowledge.checkData(params, i, level+1);

							}
						}
						str += '>' + j['name'] + '</option>';
					} else {
						str += '<option value="' + i + '">' + j['name'] + '</option>';
					}
				}
			}
		});
		str += '</select>';
		box.nextAll('select').remove();
		box.after(str);
		box.next('select').bind("change", function() {
			// initSelects_3(params, $(this).val());
			xes.knowledge.checkData(params, $(this).val() , level+1);

		});
	} else {
		// 如果没有子类, 则隐藏下级下拉框
		box.nextAll('select').remove();
	}
}

/**
 * 初始化四级联动下拉框
 *
 * priely	2013-03-25
 */
function initSelects(params) {
	var params = xes.knowledge.params;

	function set1(result){
		if (result != '') {
				var str = '';
				str += '<select id="' + params.level_1_id + '" name="' + params.level_1_id + '">';
				str += '<option value="" selected>--选择知识点--</option>';
				
				$.each(result, function(i, j) {
					if (params.department_id == 0 && params.subject_id == 0) {
						if (params.level_1_default != '') {
							str += '<option value="' + i + '"';
							if (params.level_1_default == i) {
								str += ' selected ';
								if (params.level_2_default != '') {
									initSelects_2(params, i);
									xes.knowledge.checkData(params, i, 2);
								}
							}
							str += '>' + j['name'] + '</option>';
						} else {
							str += '<option value="' + i + '">' + j['name'] + '</option>';
						}
					}else{
						if (params.department_id == j['department_id'] && params.subject_id == j['subject_id']) {
							if (params.level_1_default != '') {
								str += '<option value="' + i + '"';
								if (params.level_1_default == i) {
									str += ' selected ';
									if (params.level_2_default != '') {
										initSelects_2(params, i);
									}
								}
								str += '>' + j['name'] + '</option>';
							} else {
								str += '<option value="' + i + '">' + j['name'] + '</option>';
							}
						}
					}
				});
				str += '</select>';
				
				$('#' + params.container_id).html(str);
				
				$('#' + params.level_1_id).bind("change", function() {
					initSelects_2(params, $(this).val());
				});
			}
	}
	var a1 = xes.LocalStorage.get('k1');
		if(a1){
			set1(a1);
		}else{
			$.ajax({
				url		: params.url + '1',
				dataType: 'jsonp',
				jsonp	: 'jsonCallback',
				timeout	: 6000,
				success	: function(result) {
					xes.LocalStorage.set('k1',json);
							set1(json);
					
				},
				error	: function() {
					alert('数据读取错误..');
				}
			});	
		}
}


// function initSelects_2(params, pid) {
// 	console.log('pid:' + pid);
// 	var box = $('#' + params.level_1_id);
// 	if(pid == '') {
// 		// 如果没有选择一级,则删除二,三,四级下拉框
// 		box.nextAll('select').remove();
// 	} else {
		
// 		var a2 = xes.LocalStorage.get('k2');
// 		if(a2){
// 			setDom(a2, pid, 2);
// 		}else{
// 			$.ajax({
// 				url		: params.url + '2',
// 				dataType: 'jsonp',
// 				jsonp	: 'jsonCallback',
// 				timeout	: 6000,
// 				success	: function(json) {
// 					xes.LocalStorage.set('k2',json);
// 					setDom(json, pid, 2);
// 				},
// 				error	: function() {
// 					alert('数据读取错误..');
// 				}
// 			});
// 		}
// 	}
// }


// function initSelects_3(params, pid) {
// 	var box = $('#' + params.level_2_id);
// 	if(pid == '') {
// 		// 如果没有选择二级,则删除三,四级下拉框
// 		box.nextAll('select').remove();
// 	} else {
		
// 		var a3 = xes.LocalStorage.get('k3');
// 		if(a3){
// 			setDom(a3, 3);
// 		}else{
// 			$.ajax({
// 				url		: params.url + '3',
// 				dataType: 'jsonp',
// 				jsonp	: 'jsonCallback',
// 				timeout	: 6000,
// 				success	: function(json) {
// 					xes.LocalStorage.set('k3',json);
// 					setDom(json, 3);
// 				},
// 				error	: function() {
// 					alert('数据读取错误..');
// 				}
// 			});
// 		}
// 	}
// }


function initSelects_4(params, pid) {
	var box = $('#' + params.level_3_id);
	if(pid == '') {
		// 如果没有选择三级,则删除四级下拉框
		box.nextAll('select').remove();
	} else {
		function set4(result){
			// 如果有子类别,则显示
				if (params.level>=4 && result[pid] && result[pid] != '') {
					var str = '&nbsp;';
					str += '<select id="' + params.level_4_id + '" name="' + params.level_4_id + '">';
					str += '<option value="" selected>--选择知识点--</option>';
					
					$.each(result[pid], function(i, j) {
						if (params.department_id == 0 && params.subject_id == 0) {
							if (params.level_4_default != '') {
								str += '<option value="' + i + '"';
								if (params.level_4_default == i) {
									str += ' selected ';
								}
								str += '>' + j['name'] + '</option>';
							} else {
								str += '<option value="' + i + '">' + j['name'] + '</option>';
							}
						}else{
							if (params.department_id == j['department_id'] && params.subject_id == j['subject_id']) {
								if (params.level_4_default != '') {
									str += '<option value="' + i + '"';
									if (params.level_4_default == i) {
										str += ' selected ';
									}
									str += '>' + j['name'] + '</option>';
								} else {
									str += '<option value="' + i + '">' + j['name'] + '</option>';
								}
							}
						}
					});
					str += '</select>';
					
					box.nextAll('select').remove();
					box.after(str);	
				} else {
					// 如果没有子类, 则隐藏下级下拉框
					box.nextAll('select').remove();
				}
		}
		var a4 = xes.LocalStorage.get('k4');
		if(a4){
			set4(a4);
		}else{
			$.ajax({
				url		: params.url + '4',
				dataType: 'jsonp',
				jsonp	: 'jsonCallback',
				timeout	: 6000,
				success	: function(json) {
					xes.LocalStorage.set('k4',json);
					set4(json);
				},
				error	: function() {
					alert('数据读取错误..');
				}
			});
		}
	}
}

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
		console.log(n);
		if(this.value == 1){
			$('#questions_type_checkbox_'+n).show().siblings('.questions_type').hide();
		}else{
			$('#questions_type_input_'+n).show().siblings('.questions_type').hide();
		}
	});

	$('#departmentId').change(function(){
		$('.choose').html('');
		setKnowledge($(this).val());
	});
	$('input[type="radio"][name="subjectId"]').click(function(){
		$('.choose').html('');
		setKnowledge(null,$(this).val());
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
 * 追缴填空题
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


var batch = {
	name:'试卷名称',
	type:'试卷类型',
	time:'答题时间',
	total:'试卷总分',
	department:'学部',
	subject:'学科',
	description:'描述',
	items:{
		'1001':{
			id:'',
			num:'1',
			content:'http://...jpg',
			answerAnalysis:'解析',
			title:'试题名称',
			keyword:'关键字',
			customDifficulty:'系数',
			knowledge:[2,3,2],
			type:'试题类型',
			questions_type_checkbox:[1,2,4,8]/*'正确答案'*/,
			score:'分值'

		}
	}
};


var items = {
	'1':{
		id:''
	}
};

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
			// box.removeClass('collapsed');
		}else{
			itemToggle(box, 'collapsed');
			// box.addClass('collapsed');
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
			// items.addClass('collapsed');
			itemToggle(items, 'collapsed');
			itemsToggle($(this), 'collapsed');

			// $(this).removeClass('items_collapsed').addClass('items_expanded');
			// $(this).text('展开');
		}else{
			// items.removeClass('collapsed');
			itemToggle(items, 'expanded');
			itemsToggle($(this), 'expanded');

			// $(this).removeClass('items_expanded').addClass('items_collapsed');
			// $(this).text('收起');
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
})