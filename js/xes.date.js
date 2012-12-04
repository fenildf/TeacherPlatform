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


/**      
* 对Date的扩展，将 Date 转化为指定格式的String      
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
* eg:      
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18   
    
//var date = new Date();      
//window.alert(date.pattern("yyyy-MM-dd hh:mm:ss"));      
*/        
Date.prototype.format=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "\u65e5",         
    "1" : "\u4e00",         
    "2" : "\u4e8c",         
    "3" : "\u4e09",         
    "4" : "\u56db",         
    "5" : "\u4e94",         
    "6" : "\u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}

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

    d.clock = d.clock || {};
    d.clock.date = '';
    d.clock.dom = '';
    
    d.clock.count = function(){
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.date = date.getDate();
        this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
        this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        this.toString = function() {
            return "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
        };
        this.toSimpleDate = function() {
            return this.year + "-" + this.month + "-" + this.date;
        };
        this.toDetailDate = function() {
            return this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
        };
        this.display = function(ele) {
            var count = new d.clock.count(day);

            var html = count.toDetailDate();
            ele.html(html); 
            window.setTimeout(function() {
                count.display(ele);
            }
            , 1000);
        };
    };

    d.clock.serverClock = function(s_year, s_month, s_day, s_hour, s_min, s_sec) {
        //估计从服务器下载网页到达客户端的延时时间，默认为1秒。 
        var _delay = 1000;

        //服务器端的时间 
        var serverTime = null;
        if(arguments.length == 0) {
            //没有设置服务器端的时间，按当前时间处理 
            serverTime = new Date();
            _delay = 0;
        } else {
            serverTime = new Date(s_year, s_month - 1, s_day, s_hour, s_min, s_sec)
        };

        //客户端浏览器的时间 
        var clientTime = new Date();
        //获取时间差 
        var _diff = serverTime.getTime() - clientTime.getTime();

        //设置从服务器下载网页到达客户端的延时时间，默认为1秒。 
        this.set_delay = function(value) {
            _delay = value;
        };

        //获取服务的日期时间 
        this.get_ServerTime = function(formatstring) {
            clientTime = new Date();
            serverTime.setTime(clientTime.getTime() + _diff + _delay);
            if(formatstring == null) {
                return serverTime;
            }else{
                return serverTime.format(formatstring);
            }
        };
    };

    d.clock.start = function(dom,day){
        var day = dom.text();
        var time = {};
        time.tmp = day.split(' ');
        time.days = time.tmp[0].split('-');
        time.times = time.tmp[1].split(':');

        time.year = time.days[0];
        time.month = time.days[1];
        time.day = time.days[2];

        time.hour = time.times[0];
        time.minute = time.times[1];
        time.second = time.times[2];

        var srvClock = new d.clock.serverClock(time.year, time.month, time.day, time.hour, time.minute, time.second); 

        window.setInterval(function(){ 
            var html = srvClock.get_ServerTime('yyyy-MM-dd HH:mm:ss');
            dom.html(html); 
        },500);

    };

    d.clock.stop = function(){
        clearTimeout(d.clock.timeout);
    };






})();



// var clock = new Clock();
// function Clock() {
//     var date = new Date();
//     this.year = date.getFullYear();
//     this.month = date.getMonth() + 1;
//     this.date = date.getDate();
//     this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
//     this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//     this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//     this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//     this.toString = function() {
//         return "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
//     };
//     this.toSimpleDate = function() {
//         return this.year + "-" + this.month + "-" + this.date;
//     };
//     this.toDetailDate = function() {
//         return this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
//     };
//     this.display = function(ele) {
//         var clock = new Clock();
//         ele.html( clock.toString() ); 
//         window.setTimeout(function() {
//             clock.display(ele);
//         }
//         , 1000);
//     };
// }
// clock.display($('#clock'));



// var oTime = $('.times');

// function _fresh(){
//     var starTime = new Date("2012/12/4 14:40:00");
//     var Times = {
//         y : starTime.getFullYear(),
//         ms : starTime.getMonth()+1,
//         d : starTime.getDay(),
//         h : starTime.getHours(),
//         mn: starTime.getMinutes(),
//         s : starTime.getSeconds()
//     }
//     var oDate = new Date();
    
//     var leftsecond = parseInt( ( starTime.getTime() - oDate.getTime() )/1000 );
//     var oSec=Math.abs(parseInt((((leftsecond%86400000)%3600000)%60000)));
//     var oMin=parseInt(Math.abs(parseInt(oSec/60%60)));
//     var oHour=Math.abs(parseInt(oMin/60));
//     var oDays=Math.abs(parseInt(oHour/24));
//     var h = (Times.h + oHour)%24;
//     var m = (Times.mn + oMin)%60;
//     var s = (Times.s + oSec)%60;
//     //alert(oHour);
//     all = Times.y + '年' + Times.ms + '月' + Times.d   + '日' + h + '时' + m + '分' + s + '秒';
//     /*if(leftsecond >= 0){
//         oTime.text(oHour + '时' + leftsecond).css('background','yellow'); //'请等待>>>>>>>>'
//     }*/
//     if(leftsecond < 0 && leftsecond >- 360000000000000000000000000000){
//         oTime.text(all).css('background','green'); 
//     }
//     /*else if(leftsecond <= -4){
//         oTime.text(leftsecond).css('background','red');   //'OVER'
//     }*/
// }


// _fresh();
// var sh=setInterval(_fresh,100);


/* 
名称：服务器时钟（一次读取，实时显示） 
功能：在客户端浏览器上显示服务器端的时间。 
原理：     
    算法步骤： 
    1. 获取服务端的日期时间。 
    2. 根据客户端浏览器的时间可以得到服务器和客户端的时间差。 
    3. 服务器的时钟 = 客户端的时钟（变化值）+ 时间差（固定值） 
     
    这样客户端就没有必要实时的到服务器端去取时间。 

作者：三月三 
来源：http://www.cnblogs.com/march3/archive/2009/05/14/1456720.html 
说明： 
    1. 多浏览器支持 
    2. 由于网络延时无法估计的原因，会有一定的误差。 
        用户可以通过 set_delay() 方法来减少误差。 
参数： 
    s_year, s_month, s_day, s_hour, s_min, s_sec   
    分别为服务器端的 年 月 日 时 分 秒， 

    例如：2008,9,19,0,9,0 表示 2008年9月19日 0点9分0秒 



用法
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
 <head> 
  <title> 在客户端显示服务器时钟Demo </title> 
</head> 

<body> 
<div id="time"></div> 
<script language="javascript" src="ServerClock.js"></script> 
<script language="javascript"> 
<!-- 
/* 
以下代码中：2008,9,19,0,9,0 为服务器端返回的时间， 

以 ASP.NET代码为例 
 var srvClock = new ServerClock(<%=DateTime.Now.ToString("yyyy,M,d,H,m,s") %>); 
*
var srvClock = new ServerClock(2008,9,19,0,9,0); 

/* 时间格式化字符串 *
var fmtStr = "服务器的时间是：<br/>yyyy年MM月dd日 HH:mm:ss E<br/>是该年的第D天<br/>是该年的第w周<br/>"; 

/*  
由于网络延时无法估计的原因，会有一定的误差。用户可以通过 set_delay() 方法来减少误差。 
默认为1000，表示 1 秒。  
*
srvClock.set_delay(3000); /* 时钟向后延时 3 秒 *

/* 0.5秒刷新一次时间 *
window.setInterval(function(){ 
    document.getElementById("time").innerHTML =  
                                srvClock.get_ServerTime(fmtStr); 
},500); 

//--> 
</script> 
   

 </body> 
</html>
*/ 
// var ServerClock = function(s_year, s_month, s_day, s_hour, s_min, s_sec) {
//         //估计从服务器下载网页到达客户端的延时时间，默认为1秒。 
//         var _delay = 1000;

//         //服务器端的时间 
//         var serverTime = null;
//         if(arguments.length == 0) {
//             //没有设置服务器端的时间，按当前时间处理 
//             serverTime = new Date();
//             _delay = 0;
//         } else {
//             serverTime = new Date(s_year, s_month - 1, s_day, s_hour, s_min, s_sec)
//         };

//         //客户端浏览器的时间 
//         var clientTime = new Date();
//         //获取时间差 
//         var _diff = serverTime.getTime() - clientTime.getTime();

//         //设置从服务器下载网页到达客户端的延时时间，默认为1秒。 
//         this.set_delay = function(value) {
//             _delay = value;
//         };

//         //获取服务的日期时间 
//         this.get_ServerTime = function(formatstring) {
//             clientTime = new Date();
//             serverTime.setTime(clientTime.getTime() + _diff + _delay);
//             if(formatstring == null) {
//                 return serverTime;
//             }else{
//                 return serverTime.format(formatstring);
//             }
//         };
//     }

       
 