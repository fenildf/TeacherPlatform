<?php

/**
本PHP程序属于一个服务器端程序的例子，不正确的使用可能威胁服务器的安全，使用之前请仔细确认相关安全设置。
*/

//文件保存目录路径
//$save_path = "/home/www/file/editor/".date("Ym").'/';
$save_path = "D:/xes/src/preview/course/".date("Ym").'/';
//文件保存目录URL
$save_url = 'http://x01.wss2.0.com/course/'.date("Ym").'/';
//$baseUrl = array('x01.xesimg.com', 'x02.xesimg.com', 'x03.xesimg.com', 'x04.xesimg.com', 'r01.xesimg.com', 'r02.xesimg.com', 'r03.xesimg.com', 'r04.xesimg.com', 's01.xesimg.com', 's02.xesimg.com', 's03.xesimg.com', 's04.xesimg.com');
//$rand_key = array_rand($baseUrl, 1);
//$base_url = $baseUrl[$rand_key];
//$save_url = 'http://' . $base_url . '/editor/' . date("Ym") . '/';
//定义允许上传的文件扩展名
$ext_arr = array('gif', 'jpg', 'jpeg', 'png', 'bmp');
//最大文件大小
$max_size = 1000000;

//有上传文件时
if (empty($_FILES) === false) {
	//原文件名
	$file_name = $_FILES['imgFile']['name'];
	//服务器上临时文件名
	$tmp_name = $_FILES['imgFile']['tmp_name'];
	//文件大小
	$file_size = $_FILES['imgFile']['size'];
	//检查文件名
	if (!$file_name) {
		alert("请选择文件。");
	}
	//检查目录
	if ((@is_dir($save_path) === false) && !@mkdir($save_path, 0755)) {
		alert($save_path);
	}
	//检查目录写权限
	if (@is_writable($save_path) === false) {
		alert("上传目录没有写权限。");
	}
	//检查是否已上传
	if (@is_uploaded_file($tmp_name) === false) {
		alert("临时文件可能不是上传文件。");
	}
	//检查文件大小
	if ($file_size > $max_size) {
		alert("上传文件大小超过限制。");
	}
	//获得文件扩展名
	$temp_arr = explode(".", $file_name);
	$file_ext = array_pop($temp_arr);
	$file_ext = trim($file_ext);
	$file_ext = strtolower($file_ext);
	//检查扩展名
	if (in_array($file_ext, $ext_arr) === false) {
		alert("上传文件扩展名是不允许的扩展名。");
	}
	//新文件名
//	$new_file_name = date("YmdHis") . '_' . rand(10000, 99999) . '.' . $file_ext;
	$new_file_name = time().rand(1000,9999) . '.' . $file_ext;
	//移动文件
	$file_path = $save_path . $new_file_name;
	if (move_uploaded_file($tmp_name, $file_path) === false) {
		alert("上传文件失败。");
	}
	@chmod($file_path, 0644);
	$file_url = $save_url . $new_file_name;
	
	header('Content-type: text/html; charset=UTF-8');
	echo json_encode(array('error' => 0, 'url' => $file_url));
	exit;
}

function alert($msg) {
	header('Content-type: text/html; charset=UTF-8');
	echo json_encode(array('error' => 1, 'message' => $msg));
	exit;
}
?>