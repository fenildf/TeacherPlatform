/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/* 文件列表
 * live.list.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:xes.form.js///

///import:xes.search.js///

///import:xes.pages.js///

///import:ui/xes.ui.dialog.js///

/* =-=-=-=-=-=-=-=-=-=-=-= file_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */
function fileShare(id,file){
	xes.dialog.show('win_fileShare');
	$('#win_fileShare').find('.filepath').text(file)
	.end().find('.fileid').val(id);

}

function fileUpload(){

	xes.dialog.show('win_fileUpload');
}

// function fileDown(){
// 	var item = $('#fileList').find('input.file_checkbox:checked');
// 	if(item.length > 0){

// 	}else{
// 		alert('请选择要下载的文件');
// 	}
// }

$(function(){
	$('.grid_item tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});
	$('#btn_fileUpload').click(function(){
		fileUpload();
	})
	$('#btn_fileDown').click(function(){
		fileDown();
	});
	$('.btncannel').click(function(){
		xes.dialog.hide();
	});
	$('#file_all').bind('click',function(){
		var list = $('#fileList').find('input.file_checkbox');
		list.attr('checked',this.checked);
	});
	$('.file_checkbox').click(function(){

	});
});

