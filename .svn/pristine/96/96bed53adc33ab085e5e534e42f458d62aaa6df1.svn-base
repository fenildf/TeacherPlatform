/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 错误页面
 * tips.error.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:xes.form.js///

/* =-=-=-=-=-=-=-=-=-=-=-= tips_error.html =-=-=-=-=-=-=-=-=-=-=-=-= */
var refer = document.referrer;
var host = 'http://' + window.location.host + '/';
var _btn = $('#error_btn');

if(refer == host ){
	_btn.text('关闭');
}else{
	_btn.text('返回');
}

_btn.click(function(d) {
	if(refer == host){
		goback('close');
	}else{
		goback('');
	}
});

function goback(tp) {
	if(tp == 'close') {
		var par = window.parent;
		if(par) {
			par.getActiveTabs(function(tab){
				tab.find('span.del_btn').click();
			});
		}
	} else {
		window.history.back();
	}
}