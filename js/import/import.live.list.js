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


/* //import:ui/xes.ui.select.js// */

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

/* -------------------- xes.search.js --------------------- */

/*
 * search表单相关操作
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


/**
 * 在提交表单之前，重置分页数为1
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

/* -------------------- xes.pages.js --------------------- */

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



/* -------------------- xes.date.js --------------------- */
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
    /**
     * js日期比较(yyyy-mm-dd)
     * @param  {[type]} a [description]
     * @param  {[type]} b [description]
     * @return {[type]}   [description]
     */
    d.compare = function(a, b){

        var arr = a.split("-");
        var starttime = new Date(arr[0], arr[1], arr[2]);
        var starttimes = starttime.getTime();

        var arrs = b.split("-");
        var lktime = new Date(arrs[0], arrs[1], arrs[2]);
        var lktimes = lktime.getTime();

        if (starttimes > lktimes) {
            // alert('开始时间大于离开时间，请检查');
            return false;
        }else if(starttimes == lktimes){
            return 2;
        }else{
            return true;
        }
    };

})();



/* -------------------- widget/jquery.cookie.js --------------------- */

/*
 * jQuery.cooke
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 * @example:
    example $.cookie(’the_cookie’, ‘the_value’);
    设置cookie的值
    example $.cookie(’the_cookie’, ‘the_value’, {expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});
    新建一个cookie 包括有效期 路径 域名等
    example $.cookie(’the_cookie’, ‘the_value’);
    新建cookie
    example $.cookie(’the_cookie’, null);
    删除一个cookie
 */

jQuery.cookie = function(name, value, options) {  
    if (typeof value != 'undefined') { // name and value given, set cookie  
        options = options || {};  
        if (value === null) {  
            value = '';  
            options.expires = -1;  
        }  
        var expires = '';  
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {  
            var date;  
            if (typeof options.expires == 'number') {  
                date = new Date();  
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));  
            } else {  
                date = options.expires;  
            }  
            expires = '; expires=' + date.toUTCString();  
        }  
        var path = options.path ? '; path=' + (options.path) : '';  
        var domain = options.domain ? '; domain=' + (options.domain) : '';  
        var secure = options.secure ? '; secure' : '';  
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');  
    } else {  
        var cookieValue = null;  
        if (document.cookie && document.cookie != '') {  
            var cookies = document.cookie.split(';');  
            for (var i = 0; i < cookies.length; i++) {  
                var cookie = jQuery.trim(cookies[i]);  
                if (cookie.substring(0, name.length + 1) == (name + '=')) {  
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));  
                    break;  
                }  
            }  
        }  
        return cookieValue;  
    }  
}; 

function getCookie(objName) { //获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
    }
}
function delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=a; expires=" + date.toGMTString()+"; path=/";
    var c = getCookie(name);
    alert(c);
}




/* =-=-=-=-=-=-=-=-=-=-=-= live_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

// function liveCancel(liveId){
// 	alert('已取消');
// }

$(function(){
	$('.grid_item tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});

	xes.date.clock.start($('#serverTime'));
});