/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * Tools
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

/**
 * 全选与反选
 */
function checkAll(obj, cName) {
	var checkboxs = document.getElementsByName(cName);
	for(var i = checkboxs.length; i--;) {
		checkboxs[i].checked = obj.checked;
	}
}


/* =-=-=-=-=-=-=-=-=-=-=-= tools/index.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$(function(){
	checkall();
	getList();
	//获取子类
	$('#filelist tr td.filename').die('click').live('click',function(){
		// if($(this).hasClass('child') == false){
			var _t = $(this).parent();
			getChild(_t);
		// }
		
	});
	$('.tbody td button.button').die('click').live('click',function(){
		createImportFiles(this);
	});
});

/**
 * 全选按钮
 */
function checkall(){
	$('#checkAll').click(function(){
		checkAll(this,'checkbox');
	});
	$('#checkAllButton').click(function(){
		$('#checkAll').click();
		checkAll($('#checkAll')[0],'checkbox');
	});	
}

/**
 * 获取文件地址
 */
function getList(){
	$.getJSON('/tools/getFileList.php',{},function(data){
		createList(data);
	});
}

/**
 * 创建列表
 */
function createList(d){
	var _html = '';
	$.each(d,function(i,v){
		_html += '<tr>'
				+'	<th><input type="checkbox" name="checkbox" class="checkbox"></th>\n'
				+'	<td>a</td>\n'
				+'	<td class="filename">' + v + '</td>\n'
				+'	<td>\n'
				+'		<button class="button blue medium">生成</button>\n'
				+'	</td>\n'
				+'</tr>\n';
		_html += '<tr class="child">\n'
				+'	<td colspan="4">\n'
				+'		<ul>\n'
				+'			<li>adaff</li>\n'
				+'		</ul>\n'
				+'	</td>\n'
				+'</tr>\n';		
	});

	$('#filelist').html(_html);
	setListBg();

}


/**
 * 隔行换色
 * 不含子元素
 */
function setListBg(){
	$('#filelist tr').not('.child').filter(':odd').addClass('bg');
}

/**
 * 获取要引入的内容
 */
function getChild(d){
	var file = $(d).find('.filename').text();
	var box = $(d).next('.child').find('ul');
	
	$.getJSON('/tools/getIncludFiles.php',{'filename':file},function(data){
		var a = getChildHtml(data);
		box.html(a);
	});
	showChild(d);
	// box.html(html);
}

function getChildHtml(d){
	var html = '';
	$.each(d,function(i,v){
			html += '<li><span class="title">/js/</span><em>' + v + '</em></li>\n';
	});
	return html;
}

function showChild(item){
	$('#filelist tr.child').hide();
	var _handle = $(item).next('tr.child');
	// console.log(_handle.css('display'));
	if(_handle.attr('style') =='display: none;'){
		_handle.show();
	}else{
		_handle.removeAttr('style');
	}
	// $(item).next('tr.child').toggle();
}

function createImportFiles(d){
	var btn = $(d),
		parent = btn.parent().parent(),
		file = parent.find('.filename').text();
		checked = parent.find('input:checkbox').attr('checked');
		checked = checked == 'checked'? true: false;
	$.getJSON('/tools/combination.php',{'filename':file,'isCombine':checked},function(data){
		if(data == 'packed'){
			btnCreated(btn);
		}else if(data == 'created'){
			btnCreated(btn);
		}else{
			alert('生成错误！');
		}

	});

}
function btnCreated(btn){
	btn.removeClass('blue');
	btn.addClass('white');
}