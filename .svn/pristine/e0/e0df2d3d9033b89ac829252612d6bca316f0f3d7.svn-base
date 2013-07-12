/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/* 教师信息
 * about.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:xes.form.js///

/* =-=-=-=-=-=-=-=-=-=-=-= about.html =-=-=-=-=-=-=-=-=-=-=-=-= */
/**
 * 展开/收起
 * @return {[type]}        [description]
 */
function boxToggle(){
	var handle = $('.box_handle .close');
	handle.click(function(){
		var txt = $(this);
		var box = $(this).parents('.box_handle').nextAll('.box_content');
		if(txt.text() == '收起'){
			box.hide();
			txt.text('展开');
		}else{
			box.show();
			txt.text('收起');
		}
		xes.iframe.setHeight();

	});

}
/**
 * 编辑/保存切换
 * @return {[type]} [description]
 */
// function editToggle(btn){
// 	if($(btn).hasClass('edit')){
// 		$(btn).hide();
// 		$(btn).next().show();
// 	}else{
// 		$(btn).hide();
// 		$(btn).prev().show();
// 	}
	
// }

function avatarEdit(btn){
	$('#btnAvatarEdit').hide();
	$('#btnAvatarSave').show();
	$('.about_avatar_input').show();
	var prev = $('#btnAvatarEdit').prev();
	if(prev.text()=='展开'){
		prev.click();
	}
	xes.iframe.setHeight();
}

function avatarSave(btn){
	$('#btnAvatarEdit').show();
	$('#btnAvatarSave').hide();
	$('.about_avatar_input').hide();
	// $('.about_avatar_files').hide();
	$('.about_avatar_files .avatar_url').text('');
	var prev = $('#btnAvatarEdit').prev();
	if(prev.text()=='展开'){
		prev.click();
	}
	xes.iframe.setHeight();
}


function infoEdit(btn){
	$('#btnInfoEdit').hide();
	$('#btnInfoSave').show();
	$('#info_content').removeClass('box_content').hide();
	$('#info_edit').addClass('box_content').show();
	var prev = $('#btnInfoEdit').prev();
	if(prev.text()=='展开'){
		prev.click();
	}
	xes.iframe.setHeight();
}

function infoSave(btn){
	$('#btnInfoEdit').show();
	$('#btnInfoSave').hide();
	$('#info_content').addClass('box_content').show();
	$('#info_edit').removeClass('box_content').hide();
	var prev = $('#btnInfoEdit').prev();
	if(prev.text()=='展开'){
		prev.click();
	}
	xes.iframe.setHeight();
}

function setImgUrl(dom, url){
	dom.change(function(){
		url.text(this.value);
	});
}
$(function(){
	//展开/收起
	boxToggle();

	//上传图片按钮
	$('.about_avatar_input .btn').die('click').live('click',function(){
		var form = $(this).parent().next('.about_avatar_files');
		var file = form.find('input[type="file"]');
		var url = form.find('.avatar_url');
		file.click();
		file.change(function(){
			url.text(this.value);
		});
		// setImgUrl(file, url);
	});


});