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
// $data = file_get_contents("php://input");
// $command = $_POST['serStr'];

$command = json_decode(file_get_contents('php://input'), true);

// python argument must be in quotes - commands have < as start character
// that causes error bash: argv: No such file or directory
$str = "python Drivers/rs232_handler.py " . chr(39) . $command['serStr'] . chr(39);

exec($str, $output);

//echo array as string back to javascript - ajax call response
echo $output[0];


?>



