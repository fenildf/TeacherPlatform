<?php
/**
 * 文件路径配置
 * @author : Marco(wujie)
 * @update : Date
 * @example:
 */


$PATH = realpath(dirname(__FILE__).'/../');
//js根目录
$PATH_JS = realpath($PATH.'/js/');
//存放带有引用路径标识符的js目录
$PATH_PAGES = realpath($PATH_JS.'/pages/').'\\';
//生成后存放的js目录
$PATH_UPDATE = realpath($PATH_JS.'/import/min/').'\\';

$PATH_JS = $PATH_JS.'\\';

?>