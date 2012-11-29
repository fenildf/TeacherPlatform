/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/* 直播列表
 * live.list.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///

///import:ui/xes.ui.tips.js///

///import:ui/xes.ui.select.js///

///import:xes.form.js///


/* =-=-=-=-=-=-=-=-=-=-=-= live_info.html =-=-=-=-=-=-=-=-=-=-=-=-= */
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
function liveCancel(liveId){
	alert('已取消');
}