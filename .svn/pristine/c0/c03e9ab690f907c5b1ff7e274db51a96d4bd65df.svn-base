<?php
/*
 
 @authors leon <kairyou@qq.com>
          you
*/
/*
class ClassName extends AnotherClass {
    
    function __construct(){
        
    }
// }
*/

$content = "这是一个静态生成网页的测试文件，文件名为<font color=#ff0000>html.html</font>";
$fp = fopen("html.shtml", "w");
if(fwrite($fp, $content)) {
	fclose($fp);
	die("写入模板成功");
} else {
	fclose($fp);
	die("写入模板失败!");
}
?>