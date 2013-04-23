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

///import:xes.iframe.js///

///import:widget/jquery.cookie.js///

///import:ui/xes.ui.tips.js///

/* //import:ui/xes.ui.select.js// */

///import:ui/xes.ui.calendar.min.js///

///import:xes.ajax.js///

///import:xes.date.js///

///import:xes.form.js///

///import:xes.search.js///

///import:xes.pages.js///

/* =-=-=-=-=-=-=-=-=-=-=-= course_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function(){

	if($("#startDate").length > 0){
		$("#startDate").calendar();
	}
	if($("#endDate").length > 0){
		$("#endDate").calendar();
	}

	$('.grid_item tbody tr').hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	});
});


function dateCompare(){
	var d1 = $('#startDate'),
		d2 = $('#endDate');
	if(d1.length > 0 && d2.length > 0){
		var a = d1.val();
		var b = d2.val();
		var t = new Date(),
			ty= t.getFullYear(),
			tm= t.getMonth()+1,
			td= t.getDate();
		var today = ty + '-' + (tm > 9 ? tm : 0+''+tm) + '-' + (td > 9 ? td : 0+''+td);
		if(a&&b){
			//开始日期大于当前日期
			var todayAfter_a = xes.date.compare(today, a);

			//结束日期大于当前日期
			var todayAfter_b = xes.date.compare(today, b);
			//结束日期大于开始日期
			var dateOK = xes.date.compare(a,b);
			if(dateOK && todayAfter_a && todayAfter_b){
				if(dateOK == 2){
					alert('结束日期不能等于开始日期');
					return false;
				}else{
					return true;
				}
			}else{
				alert('结束时间不能小于开始时间，月考时间不能小于当前时间，');
				return false;
			}
		}else{
			alert('请选择起始日期');
			return false;
		}
	}
}