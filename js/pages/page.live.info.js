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

	// 直播素材缩略图容器
	var box = $('.upload_img_thumb_list');
	// 直播素材缩略图点击事件
	box.on('click', 'li', function(){
		var index = box.find('li').index(this);
		uploadImgView(index);
	});

	// 初始化第一张图片显示
	uploadImgView(0);
	/**
	 * 下一张点击事件
	 *
	 * 三种情况：
	 * 1. 当缩略图大于10张（即有隐藏的）且 当前显示图片为可显示区域最后一张
	 * 		把第一张移到最后，再让将要显示的索引值-1；
	 * 2. 当缩略图小余10张（即无隐藏的）且 当前显示图片为可显示区域最后一张
	 * 		直接转到第一张
	 * 3. 正常情况：非可显示区域最后一张
	 * 
	 * @return {[type]} [description]
	 */
	$('.upload_img_thumb').on('click', '.upload_img_btn_next',function(){
		var act = box.find('li.current');
		// 获取当前显示的图片索引
		var index = box.find('li').index(act[0]);
		// 获取缩略图数量
		var len = box.find('li').length;
		// 将要显示图片的索引值
		var i = index + 1;

		if(len > 10 && i == 10){
			box.find('li:first').appendTo(box.find('ol'));
			uploadImgView(9);
		}else if(len <= 10 && i == len){
			uploadImgView(0);
		}else{
			uploadImgView(index + 1);
		}
	});

	/**
	 * 上一张点击事件
	 *
	 * 三种情况：
	 * 1. 当缩略图大于10张（即有隐藏的）且 当前显示图片为第一张
	 * 		把最后一张移到第一，选中第一张显示；
	 * 2. 当缩略图小余10张（即无隐藏的）且 当前显示图片为第一张
	 * 		直接转到可是区域的最后一张
	 * 3. 正常情况：非第一张
	 * 
	 * @return {[type]} [description]
	 */
	$('.upload_img_thumb').on('click', '.upload_img_btn_prev',function(){
		var act = box.find('li.current');
		var index = box.find('li').index(act[0]);
		var len = box.find('li').length;
		var i = index - 1;

		if(len > 10 && i < 0){
			box.find('li:last').prependTo(box.find('ol'));
			uploadImgView(0);
		}else if(len <= 10 && i < 0){
			uploadImgView(len - 1);
		}else{
			uploadImgView(index - 1);
		}

	});

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

/**
 * 直播素材预览
 * @param  {Number} index 要预览的图片索引值
 * @return {[type]}       [description]
 */
function uploadImgView(index){
	//设置当前状态
	var _box = $('.upload_img_thumb_list');
	_box.find('li').removeClass('current');
	_box.find('li').eq(index).addClass('current');
	//获取当前的url	
	var _url = _box.find('li').eq(index).find('img').attr('src');
	//大图预览
	var _img = $('.upload_img_view');
	_img.find('img').attr('src', _url);
	_img.find('a').attr('href', _url);
}
