/*
 * XESUI
 * Copyright 2012 xueersi.com All rights reserved.
 */

/*
 * 欢迎页
 * welcome.js
 * @update : 2012-10-05
 * @author : Marco <Marco.Pai@msn.com>
 * @version: v1.0.0
 */

///import:xes.iframe.js///


/* =-=-=-=-=-=-=-=-=-=-=-= 404.html =-=-=-=-=-=-=-=-=-=-=-=-= */	
// 跳出iframe
if (self.location != top.location) {
    top.location = self.location;
}