<?php
/*
 查询js内容
 @authors leon <kairyou@qq.com>
          you
*/

/* 
作者：bjf; 
应用：读取文件内容; 
*/ 
function read_file_content($FileName) {
	//open file 
	$fp = fopen($FileName, "r");
	$data = "";
	while(!feof($fp)) {
		//read the file 
		$data .= fgets($fp, 1024);
	}
	//close the file 
	fclose($fp);
	//delete the file 
	//unlink($FileName); 
	//return the content from the file 
$a = $data; 
$count=strpos($a,"///import:"); 
// $str=substr_replace($a,"",$count,2); 
	$b = explode('///import:',$a);
	$c = strpos($a, '///import:');
	$d = strstr($a, '///import:');
	echo pos($b);
	// echo $data;
	// foreach ( $b as $v ){
		// echo $v . '<br/>-------------------------------------------------------<br />';
	// }
	// echo count($b);
}

read_file_content("../combine/javascript/xes.js");

