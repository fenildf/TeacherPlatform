/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/* 直播信息
 * live.info.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:xes.form.js///

/* =-=-=-=-=-=-=-=-=-=-=-= live_info.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function(){
	var resourceWrap = $('#resourcePathWrap');

	if(resourceWrap.length > 0 && resourceWrap.find('a').length > 0){

		// resourceWrap[0].ondblclick = function(){
		// 	resourcePathEdit();
		// };
		resourceWrap.find('a').die('click').live('click',function(){
			resourcePathEdit();
		});
	}

});

function resourcePathEdit(){
	var resourceWrap = $('#resourcePathWrap');
	var _value = resourceWrap.find('span').text();
	var _input = '<input type="text" title="素材地址" name="resourcePath" id="resourcePath" class="input_text w_500" value="'+ _value +'" size=""><button id="resourcePathSave" type="button">保存</button>';
	resourceWrap.html(_input);
	$('#resourcePath').focus();
	$('#resourcePathSave').die('click').live('click',function(){
		submitEdit();
	});
	// $('#resourcePath').die('blur').live('blur',function(){
	// 	submitEdit();
	// });
}