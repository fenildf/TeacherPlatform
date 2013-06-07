<?php
/**
 * 返回将要加入的js内容
 * @author : Marco(wujie)
 * @update : Date
 * @example:
 */

require 'path.php';

$url = $PATH_PAGES.DIRECTORY_SEPARATOR.$_GET['filename']; //获取源码，用上面的匹配函数获得需要的内容页网址

$identifier = '///import:[url]///'; //函数第1个参数,源码里德地址形式
//根据url获取js文件内容
$content = file_get_contents($url);

/**
 * 处理函数
 * @param $content 	  : 需要检索的内容
 * @param $identifier : 用于检索引入文件的标识符
 * @param $param  : 需要获取的参数
 * @return $contents : 返回生成后的内容
 */
function canshujiequ($contents, $identifier, $param, $url) {
	if($contents == '') return array();

	if(strpos($identifier, $param) == false ) {
		echo '参数或组合字符串格式不对';
		return array();
	}
	$chaxunwz = 0;
	$canshuarr = array();
	$canshuarr = explode($param, $identifier);
	
	$len1 = count($canshuarr);
	$tpfarr = array();
	$qianjs = 0;
	$nowks = 0;
	$nowjs = 0;
	$end = 0;
	$filelist = array();
	// $num = 0;
	while(($end == 0) && ($chaxunwz < strlen($contents))) {
		$feikong = 0;
		for($i = 0; ($end == 0) && ($i < $len1); $i++) {
			if($canshuarr[$i] == '') continue;
			$feikong++;
			$tpfarr = explode('(*)', $canshuarr[$i]);

			$len2 = count($tpfarr);
			$feikongnum = 0;
			for($j = 0; ($j < $len2) && ($end == 0); $j++) {
				if($tpfarr[$j] == '') continue;
				$feikongnum++;
				if($chaxunwz >= strlen($contents)) {
					$end = 1;
					break;
				}
				if(($pipeiwz = strpos($contents, $tpfarr[$j], $chaxunwz)) !== false) {
					$chaxunwz = $pipeiwz + strlen($tpfarr[$j]);
					if($feikongnum == 1) $nowks = $pipeiwz;
					$nowjs = $chaxunwz;
				} else {
					$end = 1;
					break;
				}
			}

			if($end == 0) {
				if($feikong > 1) {
					$str = substr($contents, $qianjs, $nowks - $qianjs);
					array_push($filelist,$str);
					// $mark = $canshuarr[0] . $str . $canshuarr[1];

					// $f = file_get_contents($url);

					//判断js文件中是否已经加载了此内容，如果没有则替换标识符为具体内容
					// $temp = checkPos($contents, $f);
					// if($temp == false){
					// 	$contents = strtr($contents, array($mark => $f));
					// }
				}
				$qianjs = $nowjs;
			} else { //echo '没有匹配了<br/>';
				break;
			}
		}
	}
	$filelist = json_encode($filelist);
	return $filelist;

} 

//下面是一个测试的例子，获取网页源码，从中匹配电影的内容页地址
$newcontent = canshujiequ($content, $identifier, '[url]', $url); //返回匹配的数组

echo $newcontent;
?>