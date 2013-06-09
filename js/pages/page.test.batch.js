/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 批量导入试题
 * project.create.js
 * @update : 2013-1-30
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:xes.form.js///

// /import:xes.img.js/ //

///import:xes.localstorage.js///

///import:xes.knowledge.js///

/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */


$(function () {
	$('#paper_type').change(function(){
		var _txt = $('#paper_type option:selected').text();
		if(this.value==2 || _txt == '考试卷'){
			$('.paper_type_box').show();
			$('.question_score').show();

		}else{
			$('.paper_type_box').hide();
			$('.question_score').hide();
		}
	});

	$('.questions_type_button').change(function(){
		var n = $(this).attr('name').replace('testType_','');
		// console.log(n);
		if(this.value == 1){
			$('#questions_type_checkbox_'+n).show().siblings('.questions_type').hide();
		}else{
			$('#questions_type_input_'+n).show().siblings('.questions_type').hide();
		}
	});

	$('#departmentId').change(function(){
		$('.choose').html('');

		/**
		 * 两种方法初始化知识点：
		 *
		  	1. 传入object：
		  		xes.know.init({
					department: $(this).val()
				});
			2. 直接将键、值当2个参数传入进去：	xes.know.init('department', $(this).val());
		 */		
		xes.know.init('department', $(this).val());
	});
	$('input[type="radio"][name="subjectId"]').click(function(){
		$('.choose').html('');
		xes.know.init('subject', $(this).val());
	});
	
	xes.iframe.setHeight();
});
function getQuestionListDom(d,id){
	var _html = '';
	var _list = $('.choose div[id^="question_id_"]');
	var _before = id ? $('#question_id_'+id) 
					 : _list.length == 0 ? $('.choose') 
					 					 : _list.last();
	$.each(d,function(k,v){
		var _t = v.test_name,
			_id = v.id,
			_url = v.test_content;
		if($('#question_id_'+_id).length > 0){
			alert('《'+_t+'》这道题已经添加过了，请勿重复添加!');
			return;
		}
		_html += '<div id="question_id_' + _id + '" class="choose_list">'
		+'		<span class="question_num"><em>3</em>.</span>'
		+'		<table>'
		+'			<colgroup>'
		+'				<col width="20%">'		
		+'				<col width="30%">'		
		+'				<col width="50%">'
		+'			</colgroup>'
		+'		<tbody><tr class="question_data">'
		+'			<td>ID:<em class="question_data_id">' + _id + '</em></td>'
		+'			<td>名称：<em>' + _t + '</em></td>'
		+'			<td><em onmouseover="xes.img.hoverView(\''+ _url +'\'	,this);" onmouseout="xes.img.hideView();" class="imgView">' + _url + '</em></td>'
		+'		</tr>'

		+'	</tbody></table>'
		+'	<span>'
		+'		<a onclick="selectTestQuestions(\'' + _id + '\')" href="###">追加</a>'
		+'		<a onclick="deleteTestQuestions(\'' + _id + '\')" href="###">删除</a>'
		+'	</span>';

		if($('#paper_type').val()==1){
			_html +='	<span class="question_score" style="display:none;">';
		}else{
			_html +='	<span class="question_score">';
		}
		
		_html +='		分值：'
		+'		<input type="text" class="input_text question_data_score" value="" size="">'
		+'	</span>'
		
		+'</div>';
	});

	if(_list.length > 0){
		_before.after(_html);
	}else{
		$('.choose').html(_html);
	}
	setQuestionListNum();
	xes.iframe.setHeight();
}
/**
 * 重新计算序列号
 */
function setQuestionListNum(){
	var _list = $('.choose div[id^="question_id_"]');
	_list.each(function(i){
		$(this).find('.question_num em').text((i+1));
	});
}

function deleteQuestion(id){
	if(id){
		$('#question_id_'+id).remove();
		setQuestionListNum();
	}

}
//获取总分
function getAllScore(){
	var _list = $('.question_data_score:visible');
	var _s = 0;
	if(_list.length>0){
		_list.each(function(){
			_s += Number($(this).val());
		});
	}
	return _s ;
}

//获取试题信息
function getQuestionListValue(){
	var _list = $('.choose div[id^="question_id_"]');
	var _v = [];
	if(_list.length > 0 ){
		_list.each(function(){
			var d = $(this);
			var v = {
				'order_num':d.find('.question_num em').text(),
				'test_id':d.find('.question_data_id').text(),
				'score':Number(d.find('.question_data_score').val())
			};
			_v.push(v);
		});
	}
	return JSON.stringify(_v);
}

/* 试题页面：*/

/**
 * 追缴填空题
 */
function addFillCorrectAnswer(d){
	var _wrap = $(d).parent();

	var _html = '<span><input type="text" value="" name="fillCorrectAnswer[]" class="input_text w130">\n'
			  + '<a href="###" onclick="addFillCorrectAnswer(this);">追加</a>\n'
			  + '<a href="###" onclick="removeFillCorrectAnswer(this);">删除</a></span>';
	_wrap.after(_html);
}

function removeFillCorrectAnswer(d){
	var _wrap = $(d).parent();
	var _list = _wrap.parent().find('span');
	if(_list.length > 1){
		_wrap.remove();
	}else{
		alert('至少要有一个正确答案');
	}
}

/* =-=-=-=-=-=-=-=-=-=-=-= 编辑导入试题部分 =-=-=-=-=-=-=-=-=-=-=-=-= */


var batch = {
	name:'试卷名称',
	type:'试卷类型',
	time:'答题时间',
	total:'试卷总分',
	department:'学部',
	subject:'学科',
	description:'描述',
	items:{
		'1001':{
			id:'',
			num:'1',
			content:'http://...jpg',
			answerAnalysis:'解析',
			title:'试题名称',
			keyword:'关键字',
			customDifficulty:'系数',
			knowledge:[2,3,2],
			type:'试题类型',
			questions_type_checkbox:[1,2,4,8]/*'正确答案'*/,
			score:'分值'

		}
	}
};


var items = {
	'1':{
		id:''
	}
};

/**
 * 试题列表折叠
 * expanded / collapsed 
 */
function itemAaccordion(dom,tp){
	var item = $(dom).find('.item_body');
	if(tp == 'collapsed'){
		item.addClass('item_collapsed');
	}else{
		item.removeClass('item_collapsed');
	}
}

//试题单个点击展开/折叠
function itemToggle(dom, tp){
	if(tp == 'collapsed'){
		dom.addClass('collapsed');
	}else{
		dom.removeClass('collapsed');
	}
}

//整体展开/折叠
function itemsToggle(dom, tp){
	if(tp == 'collapsed'){
		dom.removeClass('items_collapsed').addClass('items_expanded');
		dom.text('展开');
	}else{
		dom.removeClass('items_expanded').addClass('items_collapsed');
		dom.text('收起');
	}
}

$(function(){
	//试题单个点击展开/折叠
	$('ul.labelCon li .question_item').on('click','dt', function(){
		var box = $(this).parent();
		
		if(box.hasClass('collapsed')){
			itemToggle(box, 'expanded');
			// box.removeClass('collapsed');
		}else{
			itemToggle(box, 'collapsed');
			// box.addClass('collapsed');
		}

		//当单个全部收起或者展开时，整体的那个按钮样式和文字的修改
		var items = $('ul.labelCon li .question_item');
		var collapsed = $('ul.labelCon li dl.collapsed');
		var handle = $('.question_handle_btn');
		if(items.length == collapsed.length){
			handle.removeClass('items_collapsed').addClass('items_expanded');
			handle.text('展开');
		}
		if(collapsed.length == 0){
			handle.removeClass('items_expanded').addClass('items_collapsed');
			handle.text('收起');
		}
	});

	//整体展开/折叠
	$('.question_handle_btn').on('click', function(){
		var collapsed = $(this).hasClass('items_collapsed');
		var items = $('ul.labelCon li .question_item');
		if(collapsed){
			// items.addClass('collapsed');
			itemToggle(items, 'collapsed');
			itemsToggle($(this), 'collapsed');

			// $(this).removeClass('items_collapsed').addClass('items_expanded');
			// $(this).text('展开');
		}else{
			// items.removeClass('collapsed');
			itemToggle(items, 'expanded');
			itemsToggle($(this), 'expanded');

			// $(this).removeClass('items_expanded').addClass('items_collapsed');
			// $(this).text('收起');
		}
	});

	//单个移出
	$('ul.labelCon li .question_item').on('click', '.item_delete', function(){
		if(confirm('是否确定删除')){
			$(this).parents('.question_item').remove();
		}
	});

	// 选择试卷类型
	$('#paper_type').on('change', function(){
		if(this.value == 2){
			$('.question_item').removeClass('test_paper');
		}else{
			$('.question_item').addClass('test_paper');
		}
	});

	/**
	 * 应用所有知识点
	 *
	 * 一共有3步：
	 * 		1. 获取当前要应用的知识点组
	 * 		2. 获取里面每个节点的值，将其存入到数组中
	 * 		3. 复制节点到所有知识点容器中
	 * 		4. 根据数组里面存储的值，设置所有知识点节点的选中状态
	 * 		
	 * @return {[type]} [description]
	 */
	$('.knowledge_setall').on('click', 'button,input', function(){
		// 存储以选中的知识点状态指：数组索引就是知识点的级别：1级对应的是v[0]，2级对应的是v[1];
		var v = [];
		var p = $(this).parent().prev();

		// 遍历当前点击“应用所有”按钮所属的知识点组里面的节点，将选中的值存储到数组中
		p.find('select').each(function(){
			v.push(this.value);
			$(this).find('option[value="' + this.value + '"]').attr('checked',true);
		});
		
		// console.log(v);
		// 复制到所有的知识点容器中
		$('.knowledge_box').html(p.html());

		/**
		 * 设置select的选中状态
		 * 先循环有多少个知识点组，再遍历里面的知识点节点
		 * @return {[type]} [description]
		 */
		$('.knowledge_box').each(function(){
			$(this).find('select').each(function(i){
				this.value = v[i];
			});
		});

	});



	xes.know.init({
		department:2,
		subject:2
	}).addlistener();

});



