<?php

// Function to log PHP activity
function console_log($data){
	echo '<script>';
	echo 'console.log('. json_encode($data) .')';
	echo '</script>';
}
// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// The JSON standard MIME header.
// header('Content-type: application/json; charset=utf-8', true);
// ini_set('display_errors', '1');

$command = $_POST['serStr'];

// python argument must be in quotes - commands have < as start character
// that causes error bash: argv: No such file or directory
$str = "python Drivers/rs232_handler.py " . chr(39) . $command . chr(39);

exec($str, $output);
//console_log($output);
// echo array as string back to javascript - ajax call response
echo $output[0];


?>



