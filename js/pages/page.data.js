/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 学习状体数据
 * data.study.status.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:ui/xes.ui.calendar.min.js///

///import:xes.form.js///

/* =-=-=-=-=-=-=-=-=-=-=-= data1_list.html =-=-=-=-=-=-=-=-=-=-=-=-= */

$(function () {
	// $("#startDate").calendar();
	$("#endDate").calendar();
	setTimeout(function(){
		var a = $('#courseType').val();
		// console.log(a);	
		if(a==649){
			$('#termId').show();
		}else{
			$('#termId').hide();
		}
	},100);
	
	$('#courseType').change(function(){
		if($(this).val()==649){
			$('#termId').show();
		}else{
			$('#termId').hide();
			$('#termId').val(0);
		}
	});
});


$('#pages').change(function(){
	var _page = this.value;
	 $("#currpage").val(_page);
	 $("#listSerch").submit();
});
$(".ui_pages a").click(function(){
    _url = $(this).attr('href');
    _re = /curpage\:(\d+)$/;
    _page = _url.match(_re);
    if(_page!=null){
        $("#currpage").val(_page[1]);
        $(this).attr('href','###');
        $("#listSerch").submit();
    }
});