/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * import.course.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var xes = xes || {};

xes.courselist = xes.courselist || {};

(function(){
	var c = xes.courselist;

	c.getlist = function(){};


})();




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
			setTimeout(function(){
				_setHeight(f.getPageHeight(), f.getUrl());
			},100);
		}
	};
	f.getUrl = function(){
		var _local = window.location,
			_pathname = _local.pathname.replace('/','');
		return _pathname;
	};
})();
$(function(){
	xes.iframe.setHeight();		
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
			// console.log(msg);
			if(msg === 'ok'){
				xes.ui.select.init();
			}
		});
	}
})(xes);




/* =-=-=-=-=-=-=-=-=-=-=-= xes.ajax.js =-=-=-=-=-=-=-=-=-=-=-=-= */
/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * xes.ajax.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var xes = xes || {};

xes.ajax = xes.ajax || {};

(function(){
	var a = xes.ajax;
	a._load = $('.laodding');
	a._bg = $('.loadding_bg');
	a._ajax = function(url,data,sucess,error){
		$.ajax({
			async: true,
			type: 'POST',
			url : url,
			data: data,
			dataType: 'jsonp',
			jsonp : 'callback',
			timeout: 70000,
			complete:function(){},
			success:function(d){
				sucess(d);
			},
			error:function(){}
		});
	};
	a.start = function(dom, fn){
		$(dom).ajaxStart(function(handle){
			if(fn){
				fn(handle);
			}else{
				a._loadding('show');
			}
		});
	};
	a.stop = function(dom, fn){
		$(dom).ajaxStop(function(handle){
			if(fn){
				fn(handle);
			}else{
				a._loadding('hide');
			}
		});
	};
	a._loadding = function(tp){
		if(tp == 'show'){
			a._load.show();
			a._bg.show();
		}else{
			a._load.hide();
			a._bg.hide();
		}
	};
	a.sync = function(){};
	a.get = function(){};
	a.set = function(){};
	a.post = function(url, data, sucess, error){
		a._ajax(url, data, sucess, error);
	};
	a.getJSON = function(){};
	a.callback = function(){};
	a.status = function(){};

})();


xes.post = xes.ajax.post;
/* =-=-=-=-=-=-=-=-=-=-=-= xes.form.js =-=-=-=-=-=-=-=-=-=-=-=-= */
var xform=xform||{};(function(){var a=xform;a.checkAll=function(c){var b=$('input[type="checkbox"][id="checkAll"]').attr("checked");$.each($('input[type="checkbox"][id="'+c+'"]'),function(){$(this).attr("checked",b)})};a.checkAll2=function(c){var b=0;$.each($('input[type="checkbox"][id="'+c+'"]'),function(){if($(this).attr("checked")==false){$(this).attr("checked",true);b=1}});if(b==0){$.each($('input[type="checkbox"][id="'+c+'"]'),function(){$(this).attr("checked",false)})}};a.checkInverse=function(b){$.each($('input[type="checkbox"][id="'+b+'"]'),function(){$(this).attr("checked",$(this).attr("checked")?false:true)})};a.checkBoxes=function(b,c){$.each($('input[type="checkbox"][id="'+b+'"]'),function(){$(this).attr("checked",false)});$.each(c.split(","),function(d,e){$('input[type="checkbox"][id="'+b+'"][value="'+e+'"]').attr("checked",true)})};a.checkRadio=function(b,c){$('input[type="radio"][id="'+b+'"][value="'+c+'"]').attr("checked",true)};a.checkSelect=function(b,c){$('select[id="'+b+'"] option[value="'+c+'"]').attr("selected",true)};a.getCheckedValue=function(c){var b="";$.each($('input[name="'+c+'"]:checked'),function(){b=b+","+$(this).attr("value")});return b.slice(1)};a.getCheckedText=function(c){var b="";$.each($('input[name="'+c+'"]:checked'),function(){b=b+$(this).attr("title")});return b};a.getSelectedText=function(b){var c="";if($('select[id="'+b+'"] option:selected').attr("value")!=""){c=$('select[id="'+b+'"] option:selected').text()}return c};a.confirmDelete=function(c,b){if(confirm(c)){window.location.href=b}};a.tableCheckbox=function(d,c){if(c==""){c="checkvalue"}var b=$.cookie(c);if(b==null){b=","}$.each($("table[id="+d+'] tr input[type="checkbox"]'),function(){var e=b.indexOf(","+$(this).val()+",");if(e>=0){$(this).attr("checked",true)}});$("table[id="+d+'] tr input[type="checkbox"]').click(function(){var f=$(this).val();if($(this).attr("checked")===true){var e=b.indexOf(","+f+",");if(e==-1){b=b+f+","}$.cookie(c,b,{path:"/",expires:0})}if($(this).attr("checked")===false){var e=b.indexOf(","+f+",");if(e>=0){b=b.replace(","+f+",",",")}$.cookie(c,b,{path:"/",expires:0})}})}})();xes.form=xform;function generateMixed(e){var c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];var b="";for(var a=0;a<e;a++){var d=Math.ceil(Math.random()*35);b+=c[d]}return b};

/* =-=-=-=-=-=-=-=-=-=-=-= course_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */
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
// xes.tips.error('这里是错误提示');
// var courseCreate = function(data){
// 	var box = $('#courseList');
// 	var _html = '';
// 	$.each(data,function(i,m){
// 		_html += '<tr id="courseItem_' + m.courseId + '">\n'
// 			  +'	<td><input type="checkbox"/>' + m.courseName + '</td>\n'
// 			  +'	<td><p>' + m.gradeNames + '</p></td>\n'
// 			  +'	<td>' + m.statusName + '</td>\n'
// 			  +'	<td>\n'
// 			  +'		<a id="course_edit_'+m.courseId+i+'" href="edit.html?couser_id='+m.courseId+i+'" class="open_tabs" title="' + m.courseName + '">编辑详情</a>\n'
// 			  +'		<a id="course_view_'+m.courseId+i+'" href="view.html?couser_id='+m.courseId+i+'" class="open_tabs" title="' + m.courseName + '">查看</a>\n'
// 			  +'	</td>\n'
// 			  +'</tr>\n';
// 	});
// 	box.html(_html);
// 	xes.iframe.setHeight();
// };
// function getlist(data){
	
// 	var url = 'http://teacher.wss2.0.com/TeacherCourses/teacherCourseList';
// 	// var data = data;
// 	xes.post(url, data, function(result){
// 		courseCreate(result.data);
// 	});

// };
// getlist();