<?php

	/************************************************************************
	 * CSS and Javascript Combinator 0.5
	 * Copyright 2006 by Niels Leenheer
	 *
	 */


	$cache 	  = true;
	$cachedir = dirname(__FILE__) . '/cache';
	$cssdir   = dirname(__FILE__) . '/css';
	$jsdir    = dirname(__FILE__) . '/javascript';
	$type = $_GET['type'];

	// Determine the directory and type we should use
	switch ($type) {
		case 'css':
			$base = realpath($cssdir);
			break;
		case 'js':
			$base = realpath($jsdir);
			break;
		default:
			header ("HTTP/1.0 503 Not Implemented");
			exit;
	};

	// $type = $_GET['type'];
	$elements = explode(',', $_GET['files']);
	$filename = $_GET['filename'];

	// Determine last modification date of the files
	$lastmodified = 0;
	while (list(,$element) = each($elements)) {
		$path = realpath($base . '/' . $element);
	
		if (($type == 'js' && substr($path, -3) != '.js') || 
			($type == 'css' && substr($path, -4) != '.css')) {
			header ("HTTP/1.0 403 Forbidden");
			exit;	
		}
	
		if (substr($path, 0, strlen($base)) != $base || !file_exists($path)) {
			header ("HTTP/1.0 404 Not Found");
			exit;
		}
		
		$lastmodified = max($lastmodified, filemtime($path));
	}
	
	// Send Etag hash
	$hash = $lastmodified . '-' . md5($_GET['files']);
	header ("Etag: \"" . $hash . "\"");
	
	if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && 
		stripslashes($_SERVER['HTTP_IF_NONE_MATCH']) == '"' . $hash . '"') 
	{
		// Return visit and no modifications, so do not send anything
		header ("HTTP/1.0 304 Not Modified");
		header ('Content-Length: 0');
	} 
	else 
	{
		// First time visit or files were modified

	
		// Get contents of the files
		$contents = '';
		reset($elements);
		while (list(,$element) = each($elements)) {
			$path = realpath($base . '/' . $element);
			$contents .= "\n\n" . file_get_contents($path);
		}
	file_put_contents($filename.'.'.$type,$contents);

	echo 'combine is ok<br />';
	if($type == 'js'){
		$src = $filename.'.'.$type;
		$out = $filename.'.min.'.$type;
		// echo $out;
		// exit;
		require '../javascriptPacker/class.JavaScriptPacker.php';

		$script = file_get_contents($src);

		$t1 = microtime(true);

		$packer = new JavaScriptPacker($script, 'Normal', true, false);
		$packed = $packer->pack();

		$t2 = microtime(true);
		$time = sprintf('%.4f', ($t2 - $t1) );
		echo 'script ', $src, ' packed in ' , $out, ', in ', $time, ' s.', "\n";

		file_put_contents($out, $packed);
		echo "packer is ok!";
	}
	exit;	
		

	}	

/**
 * JS压缩
 */
// function jsPacker(){
// 	$src = $filename.'.'.$type;
// 	$out = $filename.'-min'.$type;

// 	require '/Tools/javascriptPacker/class.JavaScriptPacker.php';

// 	$script = file_get_contents($src);

// 	$t1 = microtime(true);

// 	$packer = new JavaScriptPacker($script, 'Normal', true, false);
// 	$packed = $packer->pack();

// 	$t2 = microtime(true);
// 	$time = sprintf('%.4f', ($t2 - $t1) );
// 	echo 'script ', $src, ' packed in ' , $out, ', in ', $time, ' s.', "\n";

// 	file_put_contents($out, $packed);
// 	echo "packer is ok!";
// }