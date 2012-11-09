/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * xes ui 
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */
xes.ui = xes.ui || {};

/*
 * app register
 * 注册到ui组件库中
 * @Marks : 采用松散的编写方式，开发人员可以根据自己的书写习惯进行脚本编写；
 			之后如果需要用到xesui库中的资源，则需要进行注册；
 			如果注册的话，需要按照手册中提供的格式进行代码的编写。
 			
 * @namespace : xes.ui.add
 * @author : Wu Jie (Marco)
 * @update : 2012-10-26
 *
 * @param : name {string} 应用名称
 * @param : fn {Object/function} 应用方法
 * @param : callback {string} 注册结果：ok / error（返回error的原因，暂时只判断是否已经存在，以后会提供更多判断）
 * @example :
	xes.ui.add('simple',simpleApp,function(msg){
		if(msg === 'ok'){
			xes.ui.simple('Success: Applications Registered!')
		}else{
			console.log(msg);
		}
	});

	function simpleApp(tips){
		console.log(tips)
	}
**/


xes.ui.add = function(name, obj, callback){
	if(xes.ui[name]){
		callback('Error: This application already exists!');
	}else{
		xes.ui[name] = obj;
		callback('ok');
	}
};


/* Example:
 * 
 *  xes.widget('ui.tabs',{
		a:'',
		b:'',
		c:function(){}
 	});
 *
 *
 *
**/
// xes.widget = function(uiname, obj, obj){

// };