/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * UI.tabs
 * @update : 2012-10-29
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */


var tabs = tabs || {};

(function(x, undefined){
	var t = tabs;
	t.id = 0;

	xes.ui.add('tabs',{
		version: '1.0',
		options: {
			active : null,
			event : 'click',
			load : null,
			before : null
		},
		
		_setOption  : function( event ){},
		_create     : function(){},
		_url        : function( index, url ){},
		_length     : function(){},
		_tabId      : function( a ){},
		_getIndex   : function( index ){},
		_findActive : function( selector ){},
		_toggle     : function( event, eventData ){},

		enable  : function( index ){},
		disable : function( index ){},

		add     : function( url, label, index ){},
		remove  : function( index ){},
		
		load    : function( index, event ){},
		
		refresh : function(){},

		select  : function( index ){},
		

	});

})(xes);