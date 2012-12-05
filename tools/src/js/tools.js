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
	// var PATH = $('#issuancePath').val();
	//获取子类
	$('#filelist tr td.filename').die('click').live('click',function(){
			var _t = $(this).parent();
			getChild(_t);		
	});
	//单独生成
	$('.tbody td button.button').die('click').live('click',function(){
		var PATH = $('#issuancePath').val();
		createImportFiles(PATH,this);
	});
	//批量生成
	$('#createAllFiles').click(function(){
		var PATH = $('#issuancePath').val();
		createAllImportFiles(PATH);	
	});
	//批量生成css
	$('#createAllCSSFiles').click(function(){
		createAllCSSFiles();
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
	$.each(d,function(i,filename){
		// console.log(getPageName(filename));
		// return;
		var page = getPageName(filename),
			pagename = page.title,
			pageurl = page.url;
		_html += '<tr>'
				+'	<th><input type="checkbox" name="checkbox" class="checkbox"></th>\n'
				+'	<td>' + pagename + ' (<a href="/' + pageurl + '" target="_blank">查看</a>) </td>\n'
				+'	<td class="filename">' + filename + '</td>\n'
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
	var _handle = $(item).next('tr.child');
	if(_handle.is(':visible')){
		_handle.hide();
	}else{
		_handle.show();
	}
	_handle.siblings('tr.child').hide();
}

function createImportFiles(path,d){
	var btn = $(d),
		parent = btn.parent().parent(),
		file = parent.find('.filename').text();
		checked = parent.find('input:checkbox').attr('checked');
		checked = checked == 'checked'? true: false;
	var path = path || $('#issuancePath').val();
	// console.log(path);
	$.getJSON('/tools/combination.php',{'path':path,'filename':file,'isCombine':checked},function(data){
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

function createAllImportFiles(path){
	var btn = $('#filelist button.button');
	// var _list = $('#filelist  input.checkbox:checked');
	// console.log(_list);
	var path = path || $('#issuancePath').val();
	btn.each(function(){
		createImportFiles(path, this);
	});
	setTimeout(function(){
		btn.removeClass('white').addClass('blue');
	}, 5000);
}

function getPageName(filename){
	var data = {
		'page.course.edit.js'	:{title:'课程编辑',url:'edit.html'},
		'page.course.js'		:{title:'课程列表',url:'course_list.html'},
		'page.course.view.js'	:{title:'查看课程',url:'view.html'},
		'page.data.js'			:{title:'数据统计',url:'data1_list.html'},
		'page.data.view.js'		:{title:'查看数据',url:'data3_view1.html'},
		'page.live.edit.js'		:{title:'编辑直播',url:'live_edit.html'},
		'page.live.info.js'		:{title:'直播信息',url:'live_info.html'},
		'page.live.list.js'		:{title:'直播列表',url:'live_list.html'},
		'page.login.js'			:{title:'直播列表',url:'login.html'},
		'page.platform.js'		:{title:'外框页面',url:'platform.html'},
		'page.student.info.js'	:{title:'学员信息',url:'student_info.html'},
		'page.student.leach.js'	:{title:'筛选学员',url:'student_leach.html'},
		'page.student.list.js'	:{title:'学员列表',url:'student.html'},
		'page.student.study.js'	:{title:'学习情况',url:'student_study.html'},
		'page.tips.error.js'	:{title:'错误提示',url:'tips_error.html'},
		'page.tips.succeed.js'	:{title:'成功提示',url:'tips_succeed.html'},
		'page.welcome.js'		:{title:'欢迎页面',url:'welcome.html'},
		'page.404.js'			:{title:'错误页面',url:'404.html'}
		
	};
	return data[filename];
}


function createCSSFiles(path, filename){
	// var path = path || $('#issuanceCSSPath').val();
	console.log(path);
	$.getJSON('/tools/combinationCSS.php',{'path':path,'filename':filename},function(data){
		if(data == 'created'){
			$('.createCSSStatus').text(filename+'已生成！');
		}else{
			alert('生成错误！');
		}

	});

}

function createAllCSSFiles(path){
	var list = [
		'page.css',
		'page_data.css',
		'page_edit.css',
		'page_list.css',
		'page_view.css',
		'page_welcome.css'
	];
	var path = $('#issuanceCSSPath').val();
	$.each(list, function(i,filename){
		createCSSFiles(path, filename);
	});

}