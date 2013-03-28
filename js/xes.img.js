/* -------------------- xes.img.js --------------------- */

/**
 * 图片相关的功能模块
 * @update : 2013-03-25
 * @author : Marco <Mr.Pai@msn.com>
 * @version: v1.0.0
 */

var xes = xes || {};

xes.img = xes.img || {};

(function(){
	var img = xes.img;

	/**
	 * 鼠标移入时显示图片
	 * @return {[type]} [description]
	 */
	img.hoverView = function(url,dom){
		var _top =  $(dom).offset().top + $(dom).outerHeight(true);
		var _left = $(dom).offset().left;
		window.parent.imgViews(url, _top, _left);
	};
	img.hideView = function(id){
		window.parent.imgViewHide();
	};
	img.hover = function(){};
	

})();