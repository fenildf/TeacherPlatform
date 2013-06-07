/* -------------------- xes.knowledge.js --------------------- */
 
/**
 * knowledge
 *
 * 知识点
 * @authors Marco
 * @date    2013-05-27 17:50:59
 * @version $Id$
 */

var xes = xes || {};

///import:xes.localstorage.js///

xes.LocalStorage = xes.LocalStorage || {};
(function() {
	var ls = xes.LocalStorage;
	ls.set = function(k, v) {
		var _val = (typeof(v) === "object") ? JSON.stringify(v) : v;
		window.localStorage.setItem(k, _val)
	};
	ls.get = function(k) {
		var v = window.localStorage.getItem(k);
		v = JSON.parse(v);
		return v
	};
	ls.del = function(k) {
		window.localStorage.removeItem(k)
	}
})();


xes.know = xes.know || {};

(function(){
	var k = xes.know;

	/**
	 * 学部ID
	 * @type {Number}
	 */
	k.department = 0;

	/**
	 * 学科ID
	 * @type {Number}
	 */
	k.subject = 0;

	k.HTML = '';

	k.json = {};

	/**
	 * 知识点外围样式
	 * @type {String}
	 * @example <span class="knowledge_items"></span>
	 * 
	 */
	k.wrap = '.knowledge_box';

	/**
	 * 知识点DOM
	 * @type {String}
	 * @example 
	 * <span class="knowledge_items">
	 * 		<select></select>
	 * 		<select></select>
	 * </span>
	 */
	k.items = '.knowledge_box select';

	k.url = 'http://teacher.com/knowledge.php?level=';

	/**
	 * 获取当前点击的知识点的索引值（level）
	 * 
	 * @return {[type]} [description]
	 */
	k._getIndex = function(dom){
		// alert($(k.items).index(DOM));
		var index = $(dom).parent().children().index(dom)
		return Number(index) + 1;
	};

	/**
	 * 获取知识点数据
	 * @return {[type]} [description]
	 */
	
	/**
	 * 获取知识点数据
	 * @param  {Number} level 级别
	 * @param  {Number} pid   父级ID
	 * @param  {Function} func  回掉函数
	 * @return {[type]}       [description]
	 *
	 * 可以有两种调用方式：
	 *
	 * 1. 通过回掉函数：
		 	k._getJSON(level, pid, function(data){
				k._createHTML(data, level)._append(level);
			});
		2. 直接调用：
			k._getJSON(level, pid);

	 */
	k._getJSON = function(level, pid, func){

		//还差本地存储部分


		$.ajax({
			url		: k.url + level,
			dataType: 'jsonp',
			jsonp	: 'jsonCallback',
			timeout	: 6000,
			success	: function(json) {
				var json = JSON.parse(json);

				json = (pid == 0) ? json : json[pid];

				// 如果没有子节点则不处理
				if(json != undefined){
					if(func){
						func(json);
					}else{
						k._createHTML(json, level)._append(level);
						// xes.LocalStorage.set('k'+level, json);
					}

				}
			},
			error	: function() {
				alert('数据读取错误..');
			}
		});


		return this;
	};


	/**
	 * 生成HTML节点
	 * @param  {JSON} data  从数据中筛选出来的JSON数据
	 * @param  {Number} level 级别
	 * @return {Object}       知识点对象：方便链式调用
	 */
	k._createHTML = function(data, level){
		var dom = '<select name="level_' + level + '_id">'
				+ '<option value="" selected=true>--选择知识点--</option>';
		$.each(data, function(key, val){
			if(k.department == 0 && k.subject == 0){
				dom += '<option value="'+ key +'">' + val['name'] + '</option>';
			}else if(k.department == val['department_id'] && k.subject == val['subject_id']) {
				dom += '<option value="'+ key +'">' + val['name'] + '</option>';
			}

		});
		dom += '</select>';
		
		//存储到变量中
		k.HTML = dom;

		return this;
	};

	/**
	 * 在页面中插入知识点节点
	 * @param  {Number} level 传入的是将要生成的级别数，需要-1来获取上一个级别数(要插入的级别，在父级之后插入)
	 * @param  {String} html  要插入的HTML
	 * @return {object}       知识点对象，方便链式调用
	 */
	k._append = function(level, html){
		//这里需要的是上一级的级别数
		var level = Number(level) - 1;
		var html = html || k.HTML;

		//如果不是1级，则先清空后面的，然后追加
		if(level > 0){
			//由于eq是从0开始算起的，所以要-1；
			$(k.items).eq(level-1).nextAll().remove();
			$(k.items).eq(level-1).after(html);	
		}else{
			$(k.wrap).html(html);
		}
		
		return this;
	};




	/**
	 * 创建select节点：通过_createHTML 和 _append两个方法
	 * @param  {Number} level 级别
	 * @param  {Number} pid   父级id
	 * @return {[type]}       [description]
	 *
	 * 
	 */
	k.create = function(level, pid){
		var pid = pid || 0;

		// 可以用下吗回掉函数的方式
		
		// k._getJSON(level, pid, function(data){
		// 	k._createHTML(data, level)._append(level);
		// });

		// 也可以直接调用
		k._getJSON(level, pid);

		return this;
	};

	/**
	 * 移除知识点
	 * @return {[type]} [description]
	 */
	k.remove = function(){};

	/**
	 * 复制知识点
	 * @return {[type]} [description]
	 */
	k.clone = function(from, to){};

	/**
	 * 获取选中的值
	 * @return {[type]} [description]
	 */
	k.getValue = function(){};

	/**
	 * 设置要选中的值
	 * @return {[type]} [description]
	 */
	k.setValue = function(){};
	

	/**
	 * 知识点的点击事件
	 * @return {[type]} [description]
	 */
	k.click = function(dom, level){
		//点击后需要将当前元素与父级节点存储到变量中，方便多组知识点同时调用
		k.wrap = $(dom).parent();
		k.items = k.wrap.children();

		k.create(level, dom.value);
	};


	/**
	 * 监听select的change事件
	 * @return {[type]} [description]
	 */
	k.addlistener = function(){

		$(k.wrap).on('change', 'select', function(a){
			var index = k._getIndex(this);
			k.click(this, Number(index) + 1);
		});

		return this;
	};

	/**
	 * 知识点初始化方法
	 * @param  {JSON} opt  配置参数，只支持：
	 	{
			department 	:0,							// 学部ID
			subject 	:0,							// 学科ID
			wrap 		:'$('.knowledge_box')',		// 存放知识点的容器：可以是选择符，也可以直接是jQuery对象
			items 		:'$('select')',				// 知识点的select组：可以是选择符，也可以是jQuery对象
			url 		:'',						// ajax请求路径
			val 		:[1,2,3,4],					// 默认知识点选中的值（ID）：4位的数组分别代表4个级别，如果没有则用0标识
			func 		:function(know){}			// 初始化后要执行的方法，如果只需要初始化参数可不用写这个回掉
	 	}
	 * @param  {Function} func 回掉函数：如果不用opt.func的话，可以在这里进行回掉，会返回一个xes.know对象
	 * @return {[type]}      [description]
	 */
	k.init = function(opt, func){

		//覆盖原有设置
		$.each(opt, function(key, val){
			k[key] = val;
		});

		/**
		 * 初始化后要执行的方法
		 *
		 * 返回xes.know对象
		 */
		if(opt.func){
			opt.func(k);
		}

		if(func){
			func(this);
		}else{
			return this;
		}

	};

})();




xes.know.init({
	department:2,
	subject:2,
	func : function(a){
		console.log(a);
		a.create(1);
		a.addlistener();
	}
});
