/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * Date日期处理方法
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

xes.date = xes.date || {};

(function(){
	var d = xes.date;
	/**
	 * 根据日期获得星期数
	 * alert(getWeekday('2012-12-3'))
	 */
	d.getWeek = function(sdate){
		var _date = new Date(sdate.replace(/-/g, '/'));
	    var _week = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六'];
	    return _week[_date.getDay()];
	};


})();
