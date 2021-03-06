<?php
/*
Marco：

通过文件中import注释载入相应的JS文件，并进行压缩合并

*/
$PATH = realpath(dirname(__FILE__).'/../../');
//js根目录
$PATH_JS = realpath($PATH.'/js/');
//存放带有引用路径标识符的js目录
$PATH_PAGES_JS = realpath($PATH_JS.'/pages/');
//生成后存放的js目录
$PATH_UPDATE_JS = realpath($PATH_JS.'/import/');
// echo dirname(__FILE__);

// exit;
set_time_limit(0); 

/**
 * 检查内存1中是否存在内容2
 * @param $str1 : 被检查的内容
 * @param $str2 : 要检查的内容
 */
function checkPos($str1, $str2){
	$v = strpos($str1, $str2);
	return $v > 0 ? true : false;
}

/**
 *  列出目录下的文件
 * @param : 要列出的文件目录
 * @param : 回调函数
 * @return : 每次遍历时返回的文件名
 */
function dirJsFiles($path,$fn){
	if (is_dir($path)) { 
        if ($dh = opendir($path)) { 
            while (($file = readdir($dh)) !== false) { 
                if ($file!="." && $file!="..") { 
                	// if($fn){
                	// 	$fn($file);
                	// }
                    echo "<a href=file/".$file.">".$file."</a><br>"; 
                } 
            } 
        closedir($dh); 
        } 
	}
}
//列出要更新的js
// dirJsFiles($PATH_PAGES_JS,function($a){
// 	echo $a.'<br/>';
// });

/**
 * 处理函数
 * @param $content 	  : 需要检索的内容
 * @param $identifier : 用于检索引入文件的标识符
 * @param $param  : 需要获取的参数
 * @return $contents : 返回生成后的内容
 */
function canshujiequ($contents, $identifier, $param) {
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
					$mark = $canshuarr[0] . $str . $canshuarr[1];
					$f = file_get_contents($str);
					//判断js文件中是否已经加载了此内容，如果没有则替换标识符为具体内容
					$temp = checkPos($contents, $f);
					if($temp == false){
						$contents = strtr($contents, array($mark => $f));
					}
				}
				$qianjs = $nowjs;
			} else { //echo '没有匹配了<br/>';
				break;
			}
		}
	}
	
	return $contents;

} //循环截取函数定义结束
$path = './';
$url = 'page.live.edit.js'; //获取源码，用上面的匹配函数获得需要的内容页网址
$filename = 'page.live.edit';
$newfilename = strtr($filename, array('page' => 'import'));

// $content = file_get_contents($url);
$type = 'min'; //压缩
$identifier = '///import:[url]///'; //函数第1个参数,源码里德地址形式
//根据url获取js文件内容
$content = file_get_contents($url);
//下面是一个测试的例子，获取网页源码，从中匹配电影的内容页地址
$newcontent = canshujiequ($content, $identifier, '[url]'); //返回匹配的数组

// 生成合并后的文件
/**
 * 生成文件
 * @param $filename : 生成的文件名，包括路径,但不含后缀
 * @param $content  : 文件内容
 * @param $compress : 是否压缩输出
 * @return : 输出状态（成功or失败）
 */
function filePut($filename, $content, $compress = false){
	//是否需要压缩
	if($compress == true){
		//调用js压缩类
		require '../javascriptPacker/class.JavaScriptPacker.php';

		// $script = $content;

		$t1 = microtime(true);

		$packer = new JavaScriptPacker($content, 'Normal', true, false);
		$packed = $packer->pack();

		$t2 = microtime(true);
		$time = sprintf('%.4f', ($t2 - $t1) );

		// 根据现有名字设置新的文件名
		

		file_put_contents($filename.'.min.js', $packed);

		echo "packer is ok!";

	}else{
		file_put_contents($filename.'.js', $content);
		echo "newfile created!";
	}
}
// filePut($path.$newfilename,$newcontent,false);
// $PHP_SELF=$_SERVER['PHP_SELF'];
// $url='http://'.$_SERVER['HTTP_HOST'].substr($PHP_SELF,0,strrpos($PHP_SELF,'/')+1);
// echo $url;
// define('BASE_PATH',str_replace('\\','/',realpath(dirname(__FILE__).'/'))."/");
// echo dirname(__FILE__);
// exit;
// $dir = dirname(__FILE__)."/";  //需要读取的文件目录 相对路径



 
?>