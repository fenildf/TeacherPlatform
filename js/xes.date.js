/* -------------------- xes.date.js --------------------- */
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
    /**
     * js日期比较(yyyy-mm-dd)
     * @param  {[type]} a [description]
     * @param  {[type]} b [description]
     * @return {[type]}   [description]
     */
    d.compare = function(a, b){

        var arr = a.split("-");
        var starttime = new Date(arr[0], arr[1], arr[2]);
        var starttimes = starttime.getTime();

        var arrs = b.split("-");
        var lktime = new Date(arrs[0], arrs[1], arrs[2]);
        var lktimes = lktime.getTime();

        if (starttimes > lktimes) {
            // alert('开始时间大于离开时间，请检查');
            return false;
        }else{
            return true;
        }
    };

})();

