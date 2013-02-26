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