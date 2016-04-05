<?php

// Prevent caching.
function console_log($data){
	echo '<script>';
	echo 'console.log('. json_encode($data) .')';
	echo '</script>';
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// The JSON standard MIME header.
// header('Content-type: application/json; charset=utf-8', true);
// ini_set('display_errors', '1');

$command = $_POST['serStr'];
$str = "python query_serial.py " . $command;

exec($str, $output);
//console_log($output);
echo $output[0];


?>



