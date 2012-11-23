/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * import.course.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js


///import:ui/xes.ui.select.js


///import:xes.ajax.js


/* =-=-=-=-=-=-=-=-=-=-=-= course_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

// var courseCreate = function(data){
// 	var box = $('#courseList');
// 	var _html = '';
// 	$.each(data,function(i,m){
// 		_html += '<tr id="courseItem_' + m.courseId + '">\n'
// 			  +'	<td><input type="checkbox"/>' + m.courseName + '</td>\n'
// 			  +'	<td><p>' + m.gradeNames + '</p></td>\n'
// 			  +'	<td>' + m.statusName + '</td>\n'
// 			  +'	<td>\n'
// 			  +'		<a id="course_edit_'+m.courseId+i+'" href="edit.html?couser_id='+m.courseId+i+'" class="open_tabs" title="' + m.courseName + '">编辑详情</a>\n'
// 			  +'		<a id="course_view_'+m.courseId+i+'" href="view.html?couser_id='+m.courseId+i+'" class="open_tabs" title="' + m.courseName + '">查看</a>\n'
// 			  +'	</td>\n'
// 			  +'</tr>\n';
// 	});
// 	box.html(_html);
// 	xes.iframe.setHeight();
// };
// function getlist(data){
	
// 	var url = 'http://teacher.wss2.0.com/TeacherCourses/teacherCourseList';
// 	// var data = data;
// 	xes.post(url, data, function(result){
// 		courseCreate(result.data);
// 	});

// };
// getlist();