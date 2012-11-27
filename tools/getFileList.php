<?php
/**
 * 获取要更新的文件列表
 * @author : Marco(wujie)
 * @update : 2012-11-27
 * @example:
 */

require 'path.php';

/**
 *  列出目录下的文件
 * @param : 要列出的文件目录
 * @param : 回调函数
 * @return : 每次遍历时返回的文件名
 */
function dirJsFiles($path){
	if (is_dir($path)) { 
		$fileList = array();
        if ($dh = opendir($path)) { 
            while (($file = readdir($dh)) !== false) { 
                if ($file!="." && $file!="..") { 
                	// if($fn){
                	// 	$fn($file);
                	// }
                	array_push($fileList,$file);
                    // echo "<a href=file/".$file.">".$file."</a><br>"; 
                } 
            } 
        closedir($dh); 
        } 
        $fileList = json_encode($fileList);
        return $fileList;
	}
}

echo dirJsFiles($PATH_PAGES);
?>