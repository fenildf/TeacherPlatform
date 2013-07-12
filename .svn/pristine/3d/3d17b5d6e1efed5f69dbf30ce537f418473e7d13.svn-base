/* -------------------- xes.register.js --------------------- */
/*
 * App register to xesui
 * 应用注册模块，负责将应用注册到xes模块中
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

/*
 * @namespace: xes.register
 * @param : app {string}
 * @param : fn {function}
 * @param  : callback {function}
 * @returns : xes
 *
 **/

xes.register = function(app, fn, callback){
	// if(xes[app]){
	// 	callback(xes);
	// }else{
	// 	xes[app] = fn;
	// }
	xes[app] = xes[app] || fn;
	if(callback){
		callback(xes);		
	}

};
