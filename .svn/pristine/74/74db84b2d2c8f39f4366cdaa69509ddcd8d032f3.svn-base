/* -------------------- xes.browser.js --------------------- */
/**
 * X.U.E frameworks
 * X : xue	学而思基础库
 * U : UI	学而思UI库
 * E : extend	学而思扩展
 * Copyright 2012 Xueersi Inc. All rights reserved.
 */


/**
 * @namespace xue.browser 判断浏览器类型和特性的属性。
 */
xue.browser = xue.browser || {};

(function(){
	var b = xue.browser, win = window, d = document, na = navigator, ua = na.userAgent;
	b.isOpera = win.opera && opera.buildNumber;
	//b.isWebKit = /WebKit/.test(ua);
	b.isIE = !b.isWebKit && !b.isOpera && (/MSIE/gi).test(ua) && (/Explorer/gi).test(na.appName);
	b.isIE6 = b.isIE && /MSIE [56]/.test.(ua);
	b.isIE7 = b.isIE && /MSIE [7]/.test(ua);
	b.isIE8 = b.isIE && /MSIE [8]/.test(ua);
	b.isIE9 = b.isIE && /MSIE [9]/.test(ua);
	//b.isGecko = !b.isWebKit && /Gecko/.test(ua);
	b.isMac = ua.indexOf('Mac') != -1;
	b.isAir = /adobeair/i.test(ua);
	b.isIDevice = /(iPad|iPhone)/.test(ua);
	b.isIOS5 = b.isIDevice && ua.match(/AppleWebKit\/(\d*)/)[1]>=534;


	
	/**
	 * 判断是否为webkit内核
	 * @property isWebkit 
	 * @grammar baidu.browser.isWebkit
	 * @meta standard
	 * @see baidu.browser.isGecko
	 * @returns {Boolean} 布尔值
	 */
	b.isWebkit = /webkit/i.test(ua);
	/**
	 * 判断是否严格标准的渲染模式
	 * @property isStrict 
	 * @grammar baidu.browser.isStrict
	 * @meta standard
	 * @returns {Boolean} 布尔值
	 */
	b.isStrict = d.compatMode == "CSS1Compat";
	/**
	 * 判断是否为gecko内核
	 * @property isGecko 
	 * @grammar baidu.browser.isGecko
	 * @meta standard
	 * @see baidu.browser.isWebkit
	 * @returns {Boolean} 布尔值
	 */
	b.isGecko = /gecko/i.test(ua) && !/like gecko/i.test(ua);
	/**
	 * 判断是否为chrome浏览器
	 * @name xue.browser.chrome
	 * @return {Number} chrome版本号
	 */
	b.chrome = /chrome\/(\d+\.\d+)/i.test(ua) ? + RegExp['\x241'] : undefined;
	/**
	 * 判断是否为firefox浏览器
	 * @name xue.browser.firefox
	 * @return {Number} firefox版本号
	 */
	b.firefox = /firefox\/(\d+\.\d+)/i.test(ua) ? + RegExp['\x241'] : undefined;
	/**
	 * 判断是否为ie浏览器
	 * @name xue.browser.ie
	 * @returns {Number} IE版本号
	 */
	//IE 8下，以documentMode为准
	//防止$冲突，将$1 写成 \x241
	/**
	 * 判断是否为ie浏览器
	 * @name baidu.browser.ie
	 * @field
	 * @grammar baidu.browser.ie
	 * @returns {Number} IE版本号
	 */
	b.ie = xue.ie = /msie (\d+\.\d+)/i.test(ua) ? (d.documentMode || + RegExp['\x241']) : undefined;
	/**
	 * 判断是否严格标准的渲染模式
	 * @name xue.browser.isStrict
	 * @returns {Boolean} 布尔值
	 */
	b.isStrict = d.compatMode == "CSS1Compat";
	/**
	 * 判断是否为maxthon浏览器
	 * @name xue.browser.maxthon
	 * @returns {Number} maxthon版本号
	 */	
	try {
	    if (/(\d+\.\d+)/.test(external.max_version)) {
	        b.maxthon = + RegExp['\x241'];
	    }
	} catch (e) {}
	
	/**
	 * 判断是否为opera浏览器
	 * @property opera opera版本号
	 * @grammar baidu.browser.opera
	 * @meta standard
	 * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.safari,baidu.browser.chrome
	 * @returns {Number} opera版本号
	 */
	
	/**
	 * opera 从10开始不是用opera后面的字符串进行版本的判断
	 * 在Browser identification最后添加Version + 数字进行版本标识
	 * opera后面的数字保持在9.80不变
	 */
	b.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(ua) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined;
    /*
     * 兼容浏览器为safari或ipad,其中,一段典型的ipad UA 如下:
     * Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10
     */
    
    /**
     * 判断是否为safari浏览器, 支持ipad
     * @property safari safari版本号
     * @grammar baidu.browser.safari
     * @meta standard
     * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.opera,baidu.browser.chrome   
     */
    b.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;

})();

