/* -------------------- xes.ajax.js --------------------- */

/*
 * xes.ajax.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

var xes = xes || {};

xes.ajax = xes.ajax || {};

(function(){
	var a = xes.ajax;
	a._load = $('.laodding');
	a._bg = $('.loadding_bg');
	a._ajax = function(url,data,sucess,error){
		$.ajax({
			async: true,
			type: 'POST',
			url : url,
			data: data,
			dataType: 'json',
			jsonp : 'callback',
			timeout: 70000,
			complete:function(){},
			success:function(d){
				sucess(d);
			},
			error:function(){}
		});
	};
	a.start = function(dom, fn){
		$(dom).ajaxStart(function(handle){
			if(fn){
				fn(handle);
			}else{
				a._loadding('show');
			}
		});
	};
	a.stop = function(dom, fn){
		$(dom).ajaxStop(function(handle){
			if(fn){
				fn(handle);
			}else{
				a._loadding('hide');
			}
		});
	};
	a._loadding = function(tp){
		if(tp == 'show'){
			a._load.show();
			a._bg.show();
		}else{
			a._load.hide();
			a._bg.hide();
		}
	};
	a.sync = function(){};
	a.get = function(){};
	a.set = function(){};
	a.post = function(url, data, sucess, error){
		a._ajax(url, data, sucess, error);
	};
	a.getJSON = function(){};
	a.callback = function(){};
	a.status = function(){};

})();


xes.post = xes.ajax.post;
