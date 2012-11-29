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

var _btn = $('#error_btn');
// console.log(history.go(-1));
if(history.length > 1) {
	_btn.text('返回');
} else {
	_btn.text('关闭');
}
_btn.click(function() {
	if(history.length > 1) {
		goback();
	} else {
		goback('close');
	}
});

function goback(tp) {
	var par = window.parent;
	if(tp == 'close') {
		if(par) {
			var _id = par.xes.ui.tabs.o.active.attr('id').replace('tab_', '');
			// console.log(_id);
			par.xes.ui.tabs.close(_id);
		}
	} else {
		history.go(-1);
	}

}