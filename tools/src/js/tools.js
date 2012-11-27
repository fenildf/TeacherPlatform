/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * Tools
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

/**
 * 全选与反选
 */
function checkAll(obj, cName) {
	var checkboxs = document.getElementsByName(cName);
	for(var i = checkboxs.length; i--;) {
		checkboxs[i].checked = obj.checked;
	}
}


/* =-=-=-=-=-=-=-=-=-=-=-= tools/index.html =-=-=-=-=-=-=-=-=-=-=-=-= */
$('#checkAll').click(function(){
	checkAll(this,'checkbox');
});