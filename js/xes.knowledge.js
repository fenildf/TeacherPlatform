/**
 * knowledge
 *
 * 知识点
 * @authors Marco
 * @date    2013-05-27 17:50:59
 * @version $Id$
 */

var xes = xes || {};

xes.knowledge = xes.knowledge || {};
xes.LocalStorage = xes.LocalStorage || {};
(function() {
	var ls = xes.LocalStorage;
	ls.set = function(k, v) {
		var _val = (typeof(v) === "object") ? JSON.stringify(v) : v;
		window.localStorage.setItem(k, _val)
	};
	ls.get = function(k) {
		var v = window.localStorage.getItem(k);
		v = JSON.parse(v);
		return v
	};
	ls.del = function(k) {
		window.localStorage.removeItem(k)
	}
})();

(function(){
	var k = xes.knowledge;
	//知识点容器集合
	k.box = '.knowledge_box';
	k.departmentID = 0;
	k.subjectID = 0;
	k.params = {};
	k.setParams = function(json){
		var knowledge = {
			// ajax请求数据地址
			'url':	'http://www.wss2.0.com/coursev4/knowledge/',
			// 联动容器id
			'container_id': 'knowledge',
			// 知识点一级类别标识
			'level_1_id': 'knowledgePoint1Id',
			// 知识点一级类别默认值
			'level_1_default': '',
			// 知识点二级类别标识
			'level_2_id': 'knowledgePoint2Id',
			// 知识点二级类别默认值
			'level_2_default': '',
			// 知识点三级类别标识
			'level_3_id': 'knowledgePoint3Id',
			// 知识点三级类别默认值
			'level_3_default': '',
			// 知识点四级类别标识
			'level_4_id': 'knowledgePoint4Id',
			// 知识点四级类别默认值
			'level_4_default': '',
			// 显示层级
			'level': 4,
			// 学部
			'department_id': k.departmentID,
			// 学科
			'subject_id': k.subjectID
		};
		k.params = knowledge;
		return this;
	};

	k.config = function(){

	};

	k.init = function(json){
		initSelects(k.params);	
	};

	k.checkData = function(params, pid, level){
		var pid = Number(pid);
		var box = $('#' + params['level_'+(level-1)+'_id']);
		if(pid == '') {
			// 如果没有选择一级,则删除二,三,四级下拉框
			box.nextAll('select').remove();
		} else {
			
			var _json = xes.LocalStorage.get('k'+level);

			// var a2 = xes.LocalStorage.get('k2');
			if(_json){
				setDom(_json, pid, level);
			}else{
				$.ajax({
					url		: params.url + level,
					dataType: 'jsonp',
					jsonp	: 'jsonCallback',
					timeout	: 6000,
					success	: function(json) {
						xes.LocalStorage.set('k'+level, json);
						setDom(json, pid, level);
					},
					error	: function() {
						alert('数据读取错误..');
					}
				});
			}
		}
	};

	k.dropdown = {
		1 : function(){},
		2 : function(){
			k.checkData('', '', 2);
		},
		3 : function(){
			k.checkData('', '', 3);
		},
		4 : function(){}
	};

})();

xes.knowledge.setParams();



function setDom(result, pid, level){
	var level = Number(level);
	var params = xes.knowledge.params;
	var val = level == 1 ? result : result[pid];
	var box = $('#' + params['level_'+(level-1)+'_id']);
	// 如果有子类别,则显示
	if (params.level>=level && result[pid] && result[pid] != '') {
		var str = '&nbsp;';
		str += '<select id="' + params['level_'+level+'_id'] + '" name="' + params['level_'+level+'_id'] + '">';
		str += '<option value="" selected>--选择知识点--</option>';

		$.each(val, function(i, j) {
			if (params.department_id == 0 && params.subject_id == 0) {
				if (params['level_'+level+'_default'] != '') {
					str += '<option value="' + i + '"';
					if (params['level_'+level+'_default'] == i) {
						str += ' selected ';
						if (params['level_'+(level+1)+'_default'] != '') {
							// initSelects_3(params, i);
							xes.knowledge.checkData(params, i, level+1);
						}
					}
					str += '>' + j['name'] + '</option>';
				} else {
					str += '<option value="' + i + '">' + j['name'] + '</option>';
				}
			}else{
				if (params.department_id == j['department_id'] && params.subject_id == j['subject_id']) {
					if (params['level_'+level+'_default'] != '') {
						str += '<option value="' + i + '"';
						if (params['level_'+level+'_default'] == i) {
							str += ' selected ';
							if (params['level_'+(level+1)+'_default'] != '') {
								// initSelects_3(params, i);
								xes.knowledge.checkData(params, i, level+1);

							}
						}
						str += '>' + j['name'] + '</option>';
					} else {
						str += '<option value="' + i + '">' + j['name'] + '</option>';
					}
				}
			}
		});
		str += '</select>';
		box.nextAll('select').remove();
		box.after(str);
		box.next('select').bind("change", function() {
			// initSelects_3(params, $(this).val());
			xes.knowledge.checkData(params, $(this).val() , level+1);

		});
	} else {
		// 如果没有子类, 则隐藏下级下拉框
		box.nextAll('select').remove();
	}
}

/**
 * 初始化四级联动下拉框
 *
 * priely	2013-03-25
 */
function initSelects(params) {
	var params = xes.knowledge.params;

	function set1(result){
		if (result != '') {
				var str = '';
				str += '<select id="' + params.level_1_id + '" name="' + params.level_1_id + '">';
				str += '<option value="" selected>--选择知识点--</option>';
				
				$.each(result, function(i, j) {
					//当学部和学科为0时
					if (params.department_id == 0 && params.subject_id == 0) {
						//1级类别默认值不为空
						if (params.level_1_default != '') {
							str += '<option value="' + i + '"';
							if (params.level_1_default == i) {
								str += ' selected ';
								if (params.level_2_default != '') {
									// initSelects_2(params, i);
									xes.knowledge.checkData(params, i, 2);
								}
							}
							str += '>' + j['name'] + '</option>';
						} else {
							str += '<option value="' + i + '">' + j['name'] + '</option>';
						}
					}else{
						if (params.department_id == j['department_id'] && params.subject_id == j['subject_id']) {
							if (params.level_1_default != '') {
								str += '<option value="' + i + '"';
								if (params.level_1_default == i) {
									str += ' selected ';
									if (params.level_2_default != '') {
										// initSelects_2(params, i);
										xes.knowledge.checkData(params, i, 2);
									}
								}
								str += '>' + j['name'] + '</option>';
							} else {
								str += '<option value="' + i + '">' + j['name'] + '</option>';
							}
						}
					}
				});
				str += '</select>';
				
				$('#' + params.container_id).html(str);
				
				$('#' + params.level_1_id).bind("change", function() {
					// initSelects_2(params, $(this).val());
					xes.knowledge.checkData(params, $(this).val(), 2);
				});
			}
	}
	var a1 = xes.LocalStorage.get('k1');
		if(a1){
			set1(a1);
		}else{
			$.ajax({
				url		: params.url + '1',
				dataType: 'jsonp',
				jsonp	: 'jsonCallback',
				timeout	: 6000,
				success	: function(result) {
					xes.LocalStorage.set('k1',json);
							set1(json);
					
				},
				error	: function() {
					alert('数据读取错误..');
				}
			});	
		}
}


// function initSelects_2(params, pid) {
// 	console.log('pid:' + pid);
// 	var box = $('#' + params.level_1_id);
// 	if(pid == '') {
// 		// 如果没有选择一级,则删除二,三,四级下拉框
// 		box.nextAll('select').remove();
// 	} else {
		
// 		var a2 = xes.LocalStorage.get('k2');
// 		if(a2){
// 			setDom(a2, pid, 2);
// 		}else{
// 			$.ajax({
// 				url		: params.url + '2',
// 				dataType: 'jsonp',
// 				jsonp	: 'jsonCallback',
// 				timeout	: 6000,
// 				success	: function(json) {
// 					xes.LocalStorage.set('k2',json);
// 					setDom(json, pid, 2);
// 				},
// 				error	: function() {
// 					alert('数据读取错误..');
// 				}
// 			});
// 		}
// 	}
// }


// function initSelects_3(params, pid) {
// 	var box = $('#' + params.level_2_id);
// 	if(pid == '') {
// 		// 如果没有选择二级,则删除三,四级下拉框
// 		box.nextAll('select').remove();
// 	} else {
		
// 		var a3 = xes.LocalStorage.get('k3');
// 		if(a3){
// 			setDom(a3, 3);
// 		}else{
// 			$.ajax({
// 				url		: params.url + '3',
// 				dataType: 'jsonp',
// 				jsonp	: 'jsonCallback',
// 				timeout	: 6000,
// 				success	: function(json) {
// 					xes.LocalStorage.set('k3',json);
// 					setDom(json, 3);
// 				},
// 				error	: function() {
// 					alert('数据读取错误..');
// 				}
// 			});
// 		}
// 	}
// }


function initSelects_4(params, pid) {
	var box = $('#' + params.level_3_id);
	if(pid == '') {
		// 如果没有选择三级,则删除四级下拉框
		box.nextAll('select').remove();
	} else {
		function set4(result){
			// 如果有子类别,则显示
				if (params.level>=4 && result[pid] && result[pid] != '') {
					var str = '&nbsp;';
					str += '<select id="' + params.level_4_id + '" name="' + params.level_4_id + '">';
					str += '<option value="" selected>--选择知识点--</option>';
					
					$.each(result[pid], function(i, j) {
						if (params.department_id == 0 && params.subject_id == 0) {
							if (params.level_4_default != '') {
								str += '<option value="' + i + '"';
								if (params.level_4_default == i) {
									str += ' selected ';
								}
								str += '>' + j['name'] + '</option>';
							} else {
								str += '<option value="' + i + '">' + j['name'] + '</option>';
							}
						}else{
							if (params.department_id == j['department_id'] && params.subject_id == j['subject_id']) {
								if (params.level_4_default != '') {
									str += '<option value="' + i + '"';
									if (params.level_4_default == i) {
										str += ' selected ';
									}
									str += '>' + j['name'] + '</option>';
								} else {
									str += '<option value="' + i + '">' + j['name'] + '</option>';
								}
							}
						}
					});
					str += '</select>';
					
					box.nextAll('select').remove();
					box.after(str);	
				} else {
					// 如果没有子类, 则隐藏下级下拉框
					box.nextAll('select').remove();
				}
		}
		var a4 = xes.LocalStorage.get('k4');
		if(a4){
			set4(a4);
		}else{
			$.ajax({
				url		: params.url + '4',
				dataType: 'jsonp',
				jsonp	: 'jsonCallback',
				timeout	: 6000,
				success	: function(json) {
					xes.LocalStorage.set('k4',json);
					set4(json);
				},
				error	: function() {
					alert('数据读取错误..');
				}
			});
		}
	}
}