/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 创建试题
 * project.create.js
 * @update : 2013-1-30
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:xes.form.js///

///import:xes.img.js///

/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function () {
	console.log($(window.parent));
	// $("#startDate").calendar();
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
		var _box = $('.questions_type');
		_box.hide();
		if(this.value == 1){
			$('#questions_type_checkbox').show();
		}else{
			$('#questions_type_input').show();
		}
	});

	$('#departmentId').change(function(){
		$('.choose').html('');
		setKnowledge($(this).val());
	});
	$('input[type="radio"][name="subjectId"]').click(function(){
		$('.choose').html('');
		setKnowledge(null,$(this).val());
	});
	
	// var _b = $('.questions_type');
	// _b.hide();
	// if($('.questions_type_button').val() == 1){
	// 	_b.eq(0).show();
	// }else{
	// 	_b.eq(1).show();
	// }

	// $('em.imgView').hover(function(){
	// 	xes.img.hoverView($(this).text(),this);
	// },function(){
	// 	xes.img.hideView();
	// });
	xes.iframe.setHeight();
});
function getQuestionListDom(d,id){
	var _html = '';
	var _list = $('.choose div[id^="question_id_"]');
	var _before = id ? $('#question_id_'+id) 
					 : _list.length == 0 ? $('.choose') 
					 					 : _list.last();
	// var _index = $('.choose div[id^="question_id_"]').index(_before[0]);
	$.each(d,function(k,v){
		var _t = v.test_name,
			_id = v.id,
			_url = v.test_content;
		if($('#question_id_'+_id).length > 0){
			// alert(_t' 这道题已经添加过了，请勿重复添加');
			if(confirm('《'+_t+'》这道题已经添加过了，请勿重复添加，点击确定将不会添加重复的《'+_t+'》')){
				return;
			}
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

	// console.log('id:'+id);
	// console.log(_before);
	if(_list.length > 0){
		_before.after(_html);
	}else{
		$('.choose').html(_html);
	}
	// alert(1);
	setQuestionListNum();
	// alert(2);
	// setTimeout(function(){
		xes.iframe.setHeight();
	// },50);
}
/**
 * 重新计算序列号
 */
function setQuestionListNum(){
	var _list = $('.choose div[id^="question_id_"]');
	_list.each(function(i){
		$(this).find('.question_num em').text((i+1));
	});
	// xes.iframe.setHeight();
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

	var _html = '<span><input type="text" value="" name="fillCorrectAnswer[]" class="input_text">\n'
			  + '<a href="###" onclick="addFillCorrectAnswer(this);">追加</a>\n'
			  + '<a href="###" onclick="removeFillCorrectAnswer(this);">删除</a></span>';
	_wrap.after(_html);
	// _wrap.parent().find('span').first().find('a:last').remove();
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