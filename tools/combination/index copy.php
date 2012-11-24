<?php
/*
Marco：

通过文件中import注释载入相应的JS文件，并进行压缩合并





函数canshujiequ($yuanma,$identifier,$mubiao)说明：

功能：类似正则获取内容，功能比正则简单，可以说是正则功能的一小部分却经常用的功能，就是实现通配符和自定义的方式获取匹配的内容，放在数组中

参数说明：
$yuanma-----要从中获取内容的字符串；
$identifier-----根据$yuanma李德内容规律，设置的字符串：可以使用通配符(*),包含[参数]，[参数是提取的需要信息；
$mubiao---------组合后的字符串；
类似火车头采集器的自定义时的设置方法，本函数也是参考火车头的那部分的设置

实现方法：不断的查询匹配的位置，以一个为单元，获取后，字符串查询移到器后开始查询，直到字符串尾部

返回类型：数组，包含匹配的字符串


*/
$url = 'page.live.edit.js'; //获取源码，用上面的匹配函数获得需要的内容页网址
$filename = 'page.live.edit';
$content = file_get_contents($url);
$type = 'min'; //压缩
$identifier = '///import:[url]///'; //函数第1个参数,源码里德地址形式
// $mubiaostr = './[参数1]'; //第2个参数，组合后的地址

set_time_limit(0); 
//循环截取函数定义开始

/**
 * 处理函数
 * @param $url 	  : 需要检索的文件内容
 * @param $identifier : 用于检索引入文件的标识符
 * @param $param  : 需要获取的参数
 */
function canshujiequ($url, $identifier, $param) {
	$type = 'min';//压缩
	if($url == '') return array();
	//根据url获取js文件内容
	$js = file_get_contents($url);;
	
	if(strpos($identifier, $param) == false ) {
		echo '参数或组合字符串格式不对';
		return array();
	}
	$chaxunwz = 0;
	$canshuarr = array();
	$canshuarr = explode($param, $identifier);
	
	$len1 = count($canshuarr);
	// $pipeiarr = array();
	$tpfarr = array();
	// $qianks = 0;
	$qianjs = 0;
	$nowks = 0;
	$nowjs = 0;
	$end = 0;
	// $num = 0;
	while(($end == 0) && ($chaxunwz < strlen($js))) {
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
				if($chaxunwz >= strlen($js)) {
					$end = 1;
					break;
				}
				if(($pipeiwz = strpos($js, $tpfarr[$j], $chaxunwz)) !== false) {
					$chaxunwz = $pipeiwz + strlen($tpfarr[$j]);
					if($feikongnum == 1) $nowks = $pipeiwz;
					$nowjs = $chaxunwz;
				} else {
					$end = 1;
					break;
				}
			}
			// echo $js;
			if($end == 0) {
				if($feikong > 1) {
					$str = substr($js, $qianjs, $nowks - $qianjs);
					$mark = '///import:' . $str . '///';
					$f = file_get_contents($str);
					$js = strtr($js, array($mark => $f));

				}
				// $qianks = $nowks;
				$qianjs = $nowjs;
			} else { //echo '没有匹配了<br/>';
				break;
			}

		}


	}
	// 根据现有名字设置新的文件名
	$newjs = strtr($url, array('page' => 'import'));
	echo $newjs;
	// 生成合并后的文件
	file_put_contents($newjs, $js);

	if($type == 'min'){
		// $src = $filename.'.'.$type;
		// $out = $filename.'.min.'.$type;
		// echo $out;
		// exit;
		require '../javascriptPacker/class.JavaScriptPacker.php';

		$script = file_get_contents($newjs);

		$t1 = microtime(true);

		$packer = new JavaScriptPacker($script, 'Normal', true, false);
		$packed = $packer->pack();

		$t2 = microtime(true);
		$time = sprintf('%.4f', ($t2 - $t1) );
		// echo 'script ', $src, ' packed in ' , $out, ', in ', $time, ' s.', "\n";

		file_put_contents('min-'.$newjs, $packed);
		echo "packer is ok!";
	}
	exit;	
} //循环截取函数定义结束


//下面是一个测试的例子，获取网页源码，从中匹配电影的内容页地址
$jieguo = canshujiequ($url, $identifier, '[url]'); //返回匹配的数组
// print_r($jieguo); //打印查看获取的效果


//上面是：根据指定内容，替换成另外的内容，并返回替换后的数组
function splitImport($d, $contents){
	$p='';

	while(list($key)=each($d)){  
		//获取数组的值
		$v = $d[$key];
		//获取对应路径下文件的内容
		$f = file_get_contents($v);
		
		//替换路径内容
		$ar = array('./' => '///import:');
		$temp = strtr($v,$ar).'///';
		//替换文件中注释内容为实际内容
		$ar2=array($temp =>$f);
		// echo $yuanma;
		$yuanma = strtr($yuanma, $ar2);
		// echo $yuanma . '<p>-------------------</p>';  

	}
}


// echo 'file is write ok!';

// file_put_contents('import.js', $yuanma);
// file_put_contents('import.js', 'aaa');
 

?>