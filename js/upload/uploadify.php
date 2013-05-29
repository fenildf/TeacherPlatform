<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

// Define a destination
$targetFolder = '/upload'; // Relative to the root

$verifyToken = md5('unique_salt' . $_POST['timestamp']);

if (!empty($_FILES) && $_POST['token'] == $verifyToken) {


//获得文件扩展名
	$file_name = $_FILES['Filedata']['name'];
	$temp_arr = explode(".", $file_name);
	$file_ext = array_pop($temp_arr);
	$file_ext = trim($file_ext);
	$file_ext = strtolower($file_ext);
	//检查扩展名
	// if (in_array($file_ext, $ext_arr) === false) {
	// 	alert("上传文件扩展名是不允许的扩展名。");
	// }
	//新文件名
//	$new_file_name = date("YmdHis") . '_' . rand(10000, 99999) . '.' . $file_ext;
	//$new_file_name = time().rand(1000,9999) . '.' . $file_ext;
	$new_file_name = date("Y") .'/' . date("m") .'/' . date("d").'/' .time().rand(1000,9999) . '.' . $file_ext;






	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
	$targetFile = rtrim($targetPath,'/') . '/' . $new_file_name;
	// $targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];
	
	// Validate the file type
	$fileTypes = array('jpg','jpeg','gif','png'); // File extensions
	$fileParts = pathinfo($new_file_name);
	// $fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array($fileParts['extension'],$fileTypes)) {
		move_uploaded_file($tempFile,$targetFile);
		echo '1';
	} else {
		echo 'Invalid file type.';
	}
}
?>