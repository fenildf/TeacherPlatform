<?php
/**
 * ajax知识点
 * 
 * @authors Your Name (you@example.org)
 * @date    2013-06-07 17:33:30
 * @version $Id$
 */

// require 'path.php';

// jsonp回掉函数
$callback = $_GET['jsonCallback'];

//知识点级别
$level = $_GET['level'];

//知识点存储路径
$path = realpath(dirname(__FILE__).'/js/json/') . DIRECTORY_SEPARATOR;

//知识点文件名
$filename = $path . 'knowledge_' . $level . '.json';

//知识点内容
$content = file_get_contents($filename);

$json = json_encode($content);

echo $callback . '('. $json .')';





// jsonp回掉函数
// $callback = $_GET['jsonCallback'];

//知识点级别
// $level = $_GET['level'];

//知识点存储路径
// $path = realpath(dirname(__FILE__).'/js/json/') . DIRECTORY_SEPARATOR;

//知识点文件名
// $filename = realpath(dirname(__FILE__).'/js/json/') . DIRECTORY_SEPARATOR . 'knowledge_' . $_GET['level'] . '.json';

//知识点内容
// $content = file_get_contents(realpath(dirname(__FILE__).'/js/json/') . DIRECTORY_SEPARATOR . 'knowledge_' . $_GET['level'] . '.json');

// $json = json_encode(file_get_contents(realpath(dirname(__FILE__).'/js/json/') . DIRECTORY_SEPARATOR . 'knowledge_' . $_GET['level'] . '.json'));

// echo $_GET['jsonCallback'] . '('. json_encode(file_get_contents(realpath(dirname(__FILE__).'/js/json/') . DIRECTORY_SEPARATOR . 'knowledge_' . $_GET['level'] . '.json')) .')';
