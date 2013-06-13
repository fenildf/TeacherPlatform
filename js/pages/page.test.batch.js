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

	// 选择学部
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

	// 选择学科
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
 * 追加填空题
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
		}else{
			itemToggle(box, 'collapsed');
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
			itemToggle(items, 'collapsed');
			itemsToggle($(this), 'collapsed');
		}else{
			itemToggle(items, 'expanded');
			itemsToggle($(this), 'expanded');
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


	// 页面加载之后第一次初始化知识点
	xes.know.init({
		department:2,
		subject:2
		url:'http://www.wss2.0.com/coursev4/knowledge/'
	}).addlistener();

});



/* --------------------- 表单验证部分 -------------------- */


// var batchItems = {
// 	'serialNumber':{
// 		id:1,
// 		serialNumber:1,
// 		testName: '试题名称',
// 		testType: '试题类别',
// 		// 试题答案
// 		correctAnswer:[1,2,4,8],
// 		// 知识点
// 		knowledgePoint:[1, 1.1, 1.1.1],
// 		textContent:'http://xueersi.com/试题题干.jpg',
// 		answerAnalysis:'http://xueersi.com/试题解析.jpg',
// 		// 难度系数
// 		customDifficulty:0.1,
// 		// 关键字
// 		keyword:'wfca',
// 		// 解析视频ID
// 		analysisVideo:10005,

// 		// 试题分数
// 		testpaperScore: 10

// 	}
// };


function checkBatchForm(dom){

}

var batchTest = batchTest || {};

// 所有试题的表单值
batchTest.items = {
	// 'serialNumber': {
	// 	id:1,
	// 	serialNumber:1,
	// 	testName: '试题名称',
	// 	testType: '试题类别',
	// 	// 试题答案
	// 	correctAnswer:[1,2,4,8],
	// 	// 知识点
	// 	knowledgePoint:[1, 1.1, 11],
	// 	textContent:'http://xueersi.com/试题题干.jpg',
	// 	answerAnalysis:'http://xueersi.com/试题解析.jpg',
	// 	// 难度系数
	// 	customDifficulty:0.1,
	// 	// 关键字
	// 	keyword:'wfca',
	// 	// 解析视频ID
	// 	analysisVideo:10005,

	// 	// 试题分数
	// 	testpaperScore: 10
	// }
};

/**
 * 检测批量试题的表单
 * @return {JSON} 返回整个试题数组;
 *
 *
 * o = {
			serial : d.serial.val(),
			score  : d.score.val(),
			type   : d.type.val(),
			name   : d.name.val(),
			content: d.content.text(),
			analysis : d.analysis.text(),
			knowledge: [],
			answer : [],
			keyword: d.keyword.val(),
			difficulty: d.difficulty.val(),
			video  : d.video.val()
		};
 */
batchTest.getValue = function(){

	var items = $('.question_items dl');

	var dom, tpbox, tp, num, answerBoxType, answerItems, num, d, o, itemData, answer, error;


	items.each(function(){

		dom = $(this);

		// 获取当前item的索引值
		num = dom.attr('id').replace('question_item_','');

		error = [];

		d = {
			serial : dom.find('.item_num input'),
			score  : dom.find('.item_sorce input'),
			type   : dom.find('input[name^="testType_"]:checked'),
			name   : dom.find('.item_title input'),
			content: dom.find('.item_pic .imgView').eq(0),
			analysis : dom.find('.item_pic .imgView').eq(1),
			// knowledge: [],
			// answer : '',
			keyword: $('#keyword_' + num),
			difficulty: $('#customDifficulty_' + num),
			video  : $('#analysisVideo_' + num)
		};


		o = {
			serial : d.serial.val(),
			score  : d.score.val(),
			type   : d.type.val()
		};

		// 检测：序号、分值、类型
		$.each(o, function(k, v){
			if(v == ''){
				errorSet(d[k]);
			}else{
				errorClear(d[k]);
			}
		});

		o.name = dom.find('.item_title input').val();
		o.keyword = $('#keyword_' + num).val();
		o.difficulty = $('#customDifficulty_' + num).val();
		o.video = $('#analysisVideo_' + num).val();


		/**
		 * 处理试题答案的值 -------------------------------------------------- 
		 */

		// 试题类型
		tp = d.type.val();

		o.type = tp;

		// 答案数组
		answer = [];

		if(o.type == ''){
			// d.type.addClass('error');
			// error.push(d.type);
			errorSet(d.type, '请选择试题类型');

		}else{
			errorClear(d.type);
		}

		// 答案类型：如果是1则为选择题，否则为填空
		answerBoxType = (tp == 1) ? 'checkbox_' + num : 'input_' + num;

		// 存储答案的容器
		d.answer = dom.find('#questions_type_' + answerBoxType).find('input');

		// 如果是1则为选择题，只把选中的值存入数组中
		if(tp == 1){
			d.answer.each(function(){
				if(this.checked){
					answer.push(this.value);
				}
			});
		}else{
			d.answer.each(function(){
				answer.push(this.value);
			})
		}
		// 将答案存到o对象中
		o.answer = answer;

		if(o.answer.length == 0){
			errorSet(d.answer, '请填写试题答案');
		}else{
			errorClear(d.answer);
		}


		/**
		 * 处理知识点的值 ----------------------------------------------- 
		 */
		
		o.knowledge = [];

		d.knowledge = dom.find('.knowledge_box select');
		// 循环知识点，将已选中的值存入数组中
		d.knowledge.each(function(){
			if(this.value){
				o.knowledge.push(this.value);
			}
		});

		if(o.knowledge.length == 0){
			errorSet(d.knowledge, '请选择知识点');
		}else{
			errorClear(d.knowledge);
		}


		/**
		 * 设置错误提示
		 * @param  {jQuery Object} d   出错的表单元素
		 * @param  {String} msg 错误提示
		 * @return {[type]}     [description]
		 */
		function errorSet(d, msg){
			d.addClass('error');
			d.parents('div').addClass('wrap_error');
			error.push(d);
			// if(msg){
			// 	alert(msg);
			// }
		}

		// 清除错误提示
		function errorClear(d){
			d.parents('div').removeClass('wrap_error');
		}



		/**
		 * 检查每道题的错误情况
		 * 检测如果error数组中有错误元素，则在父级增加错误效果，否则检测通过,这是成果样式
		 */
		if(error.length > 0){
			// dom.prevAll('dl').find('.item_body').removeClass('check_error');
			$('.question_items dl').find('.item_body').removeClass('check_error');
			dom.find('.item_body').addClass('check_error');
			alert('请检查第 ' + (Number(num)+1) + ' 道试题内容是否填写完整');
			return false;
		}else{
			dom.find('.item_body').addClass('check_succeed');

			//将数据存储到batchTest.items当中，以serial为键
			batchTest.items[o.serial] = o;

		}

	});

	var json = $.parseJSON(batchTest.items);
	// console.log(error);

	if(error.length > 0){

		return false;
	}else{
		return batchTest.items;
	}
};



batchTest.checkValue = function(dom, val){

	if(val == ''){
		dom.addClass('error');
		dom.parents('.item_body').addClass('check_error');
		return false;		
	}else{
		// dom.parents('.item_body').addClass('check_succeed');
		return ;
	}
};

// batchTest.each = function(dom){
// 	// 获取当前item的索引值
// 	var n = dom.attr('id').replace('question_item_','');
// 	var o = {
// 		serial : dom.find('.item_num input').val(),
// 		score  : dom.find('.item_sorce input').val(),
// 		name   : dom.find('.item_title input').val(),
// 		content: dom.find('.item_pic .imgView').eq(0).text(),
// 		analysis : dom.find('.item_pic .imgView').eq(1).text(),
// 		knowledge: [],
// 		type   : checkType().tp,
// 		answer : checkType().val,
// 		keyword: $('#keyword_'+n).val(),
// 		difficulty: $('#customDifficulty_'+n).val(),
// 		video  : $('#analysisVideo_'+n).val()
// 	};

// 	// 循环知识点，将已选中的值存入数组中
// 	dom.find('.knowledge_box select').each(function(){
// 		if(this.value){
// 			o.knowledge.push(this.value);
// 		}
// 	});

// 	// 检查试题类型
// 	function checkType(tp){

// 		var box = dom.find('input[name^="testType_"]:checked');

// 		var tp = box.val();

// 		// 获取类型中的序号
// 		var num = box.attr('name').replace('testType_','');
// 		// 答案类型：如果是1则为选择题，否则为填空
// 		var answerType = (tp == 1) ? 'checkbox_'+num : 'input_'+num;
// 		// 存储答案的容器
// 		var answerItems = dom.find('#questions_type_'+answerType).find('input');
// 		// 答案数组
// 		var answer = [];

// 		// 如果是1则为选择题，只把选中的值存入数组中
// 		if(tp == 1){
// 			answerItems.each(function(){
// 				if(this.checked){
// 					answer.push(this.value);
// 				}
// 			});
// 		}else{
// 			answerItems.each(function(){
// 				answer.push(this.value);
// 			})
// 		}
// 		return {
// 			tp: tp,
// 			val: answer
// 		};

// 	}
// 	return o;

// };



// 试卷



// 试题











