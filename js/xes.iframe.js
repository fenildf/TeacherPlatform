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
	
	// f.setHeight = function(id, h){
	// 	$('#'+id).height(h);
	// };

	f.getPageHeight = function(){
		var _win = $(window).height(),
			_body = $('html').height();
		return _body;
	};
	f.setHeight = function(){
		var _setHeight = window.parent.xes.setIframeHeight;
		if(_setHeight){
			_setHeight(f.getPageHeight(), f.getUrl());
		}
	};
	f.getUrl = function(){
		var _local = window.location,
			// _href = _local.href,
			// _domain = _local.domain,
			_pathname = _local.pathname;
		return _pathname;
	};
})();
// console.log(window.location.pathname);
xes.iframe.setHeight();
// window.parent.xes.setIframeHeight(xes.iframe.getPageHeight());