/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/* 文件列表
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
 * 打开标签（表单提交），非链接点击时
 */
var goTab = function(url, title, id, closeSelf){
	if(closeSelf){
		window.parent.getActiveTabs(function(self){
			var closeID = self.attr('id');
			closeID = closeID.replace('tab_','');
			window.parent.goTabs(url, title, id, closeID);
		});

		
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
				var indexof = cookievalue.indexOf(','+$(this).val()+',');
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
				if($(this).attr('checked') === 'checked'){
					//查找选中checkbox值在cookie中是否存在
					var indexof = cookievalue.indexOf(','+checkedvalue+',');
					//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
					if(indexof == -1){
						//将指定的值添加到cookie中
						cookievalue = cookievalue+checkedvalue+',';
					}
				}

				//如果checkbox为未选中状态
				if($(this).attr('checked') != 'checked'){
					//查找选中checkbox值在cookie中是否存在
					var indexof = cookievalue.indexOf(','+checkedvalue+',')
					//如果在cookie中没有找到对应的值则把当前checkbox写入cookie
					if(indexof >=0 ){
						//删除cookie中指定的值
						cookievalue = cookievalue.replace(','+checkedvalue+',' , ',');

					}
				}
				$.cookie(name, cookievalue, { expires: 0 });
				// cookievalue = ',';
			});
			
		}

		// 把tableCheckbox选中的值（cookie里面的）转化为数组格式
		f.getCheckboxValue = function (cookieName){
			var arr = $.cookie(cookieName);
			if(arr){
				arr = arr.replace(/^,/,'').replace(/,$/,'');
				return arr;
			}else{
				return false;
			}
		}

		f.defaultValue = function(){
			var placeholder = '';
			$("input:text").focus(function () { 
				this.defaultValue = $(this).attr('placeholder');

				var check1 = $(this).val(); 
				if (check1 == this.defaultValue) { 
					$(this).val(''); 
				}
				$(this).attr('placeholder','');
			}); 
			$("input:text").blur(function () { 
				

				var check1 = $(this).val(); 
				if (check1 == '') { 
					$(this).attr('placeholder', this.defaultValue); 
				}
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


/* -------------------- xes.search.js --------------------- */

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



/* -------------------- ui/xes.ui.dialog.js --------------------- */

/*
 * 弹窗	
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var dialog = dialog || {};

(function(){
	var d = dialog;

	d.init = function(obj){
		d.o.box = obj.box;
		d.o.width = obj.width;
		d.o.height = obj.height;
		d.o.close = d.o.box.find('close');
		d.id = obj.id;
		d.close();
		d.o.box.attr('id','xWin_'+obj.id);
	};
	d.position = function(ID){
		if(ID){
			d.box = $('#'+ID);
		}
		var w = d.box.width()/2;
		var h = d.box.height()/2;
		var winH = d.box.parents(window).height()/2;

		d.box.css({
			top: 100,
			left: 525 - w
		});
	};
	d.show = function(ID){
		if(ID){
			d.box = $('#'+ID);
		}
		// var _win = $('.xes_win:visible');
		// if(_win.length > 0){
		// 	_win.hide();
		// }
		d.hide();
		d.box.show();
		d.bg('show');
		d.position();
		d.close();
	};
	d.hide = function(ID){
		if(ID){
			// d.box = $('#'+ID);
			$('#'+ID).hide();
		}else{
			// d.box = $('.xes_win:visible');
			$('.xes_win:visible').hide();
		}
		// d.box.hide();
		d.bg('hide');
	};
	d.close = function(){
		d.box.find('.close').click(function(){
			d.hide();	
		});
		
	};
	d.bg = function(tp){
		var box = $('.xes_win_bg');
		if(tp == 'show'){
			var w = $(window);
			var html = '<div class="xes_win_bg">&nbsp;</div>';
			if(box.length == 0){
				$('body').append(html);
			}
			$('.xes_win_bg').show().css({
				width: w.width(),
				height: w.height()
			});
		}else{
			$('.xes_win_bg').hide();
		}
	};
})();

xes.dialog = dialog;

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




/* =-=-=-=-=-=-=-=-=-=-=-= file_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */
function fileShare(id,file){
	xes.dialog.show('win_fileShare');
	$('#win_fileShare').find('.filepath').text(file)
	.end().find('.fileid').val(id);

}

function fileUpload(){

	xes.dialog.show('win_fileUpload');
}

// function fileDown(){
// 	var item = $('#fileList').find('input.file_checkbox:checked');
// 	if(item.length > 0){

// 	}else{
// 		alert('请选择要下载的文件');
// 	}
// }

$(function(){
	$('.grid_item tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});
	$('#btn_fileUpload').click(function(){
		fileUpload();
	})
	$('#btn_fileDown').click(function(){
		fileDown();
	});
	$('.btncannel').click(function(){
		xes.dialog.hide();
	});
	$('#file_all').bind('click',function(){
		var list = $('#fileList').find('input.file_checkbox');
		list.attr('checked',this.checked);
	});
	// $('.file_checkbox').click(function(){

	// });
	if($('input:text').length > 0){
		xes.form.defaultValue();
	}
});

