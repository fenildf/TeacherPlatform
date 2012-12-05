/* -------------------- xes.cookie.js --------------------- */
/**
 * X.U.E frameworks
 * X : xes	学而思基础库
 * U : UI	学而思UI库
 * E : extend	学而思扩展
 * Copyright 2012 Xueersi Inc. All rights reserved.
 */



/**
 * @namespace xes.cookie 操作cookie的方法。
 */
xes.cookie = xes.cookie || {};
/**
 * 设置cookie的值，用encodeURIComponent进行编码
 * @name xes.cookie.set
 * @function
 * @grammar xes.cookie.set(key, value[, options])
 * @param {string} key 需要设置Cookie的键名
 * @param {string} value 需要设置Cookie的值
 * @param {number} [seconds] 设置Cookie的过期秒数：
 * @remark 该方法会对cookie值进行encodeURIComponent编码。如果想设置cookie源字符串，请使用setRaw方法。
 */
xes.cookie.set = function (key, value, seconds) {
    seconds = seconds || 0;
    var expires = "";
    if (seconds != 0) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/";
};
/**
 * 获取cookie的值
 * @name xes.cookie.get
 * @function
 * @grammar xes.cookie.get(name)
 * @param {string} key 需要获取Cookie的键名       
 * @returns {string|null} cookie的值，获取不到时返回null
 */
xes.cookie.get = function (key) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return unescape(c.substring(nameEQ.length, c.length));
        }
    }
    return false;
};

xes.cookie.getRaw = function(key){};
/**
 * 删除cookie的值
 * @name xes.cookie.remove
 * @function
 * @grammar xes.cookie.remove(key, options)
 * @param {string} key 需要删除Cookie的键名
 * @param {Object} options 需要删除的cookie对应的 path domain 等值
 */
xes.cookie.remove = function (key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = xesCookie.get(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

xes.cookie.clear = function (key) {
    xesCookie.set(name, "", -1);
};

