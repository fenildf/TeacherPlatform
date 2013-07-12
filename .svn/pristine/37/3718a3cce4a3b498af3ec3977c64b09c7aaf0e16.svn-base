/* -------------------- ui/xes.ui.select.js --------------------- */

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

var selector = selector || {};
(function(){
	var s = selector;
	s.config = {
		id : '',
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
		var box = box || $('#'+s.config.id);
		box.addClass(this.config.show);
		//以下为下拉列表中当前设置选中状态
		var _btn = box.prev(this.config.button),
			_val = _btn.val(),
			_txt = _btn.text(),
			_list = box.find('li');
		var _on = _list.find('input:hidden[value="' + _val + '"]').parent();
		_on.addClass(this.config.on).siblings().removeClass(this.config.on);
		//判断dom点击
		s.domClick();
	};

	s.close = function(box){
		var box = box || $('#'+s.config.id);
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

	/**
	 * 检查dom的点击事件，如果点击元素不是下拉框则关闭打开的下拉框
	 */
	s.domClick = function(){
		$(document).mouseup(function(a) {
			var list = $(a.target).parents(s.config.list);
			var isButton = $(a.target).hasClass(s.config.button.replace('.',''));
			if(list.length == 0 && !isButton){
				s.close();
			}else if(isButton){
				var box = $(a.target).next();
				s.show($(a.target));
			}
        });
        //检查iframe点击事件
		var iframe = $('iframe:visible');	
		// if(iframe.length > 0 && xes.platform.iframeLoaded){
		// 	xes.platform.iframeLoaded(iframe[0],function(){
		// 		var isDomClick = window.frames[iframe.attr('name')].isDomClick;
		// 		if(isDomClick){
		// 			var a = isDomClick(function(b){
		// 				if(b){
		// 			    	s.close();
		// 			    	a = null;
		// 			    	window.frames[iframe.attr('name')].unDomClick();
		// 			    }
		// 			});
		// 		}
		// 	});
		// }		
		if(iframe.length > 0){
			var isDomClick = window.frames[iframe.attr('name')].isDomClick;
			if(isDomClick){
				var a = isDomClick(function(b){
						if(b){
				    	s.close();
				    	a = null;
				    	window.frames[iframe.attr('name')].unDomClick();
				    }
				});
			}
		}
	};

	s.unDomClick = function(){
		$(document).unbind('mouseup');
	};
	/**
	 * 初始化
	 */
	s.init = function(id){
		s.config.id = id;
		this._setPosition().btnClick($(this.config.button));
	};

})();



/* 注册到UI库 */
(function(xes){
	if(xes.ui){
		xes.ui.add('select',selector,function(msg){
			if(msg === 'ok'){
				xes.ui.select.init('headSearch_select');
			}
		});
	}
})(xes);



