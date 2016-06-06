<?php

// Function to log PHP activity
// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

$command = json_decode(file_get_contents('php://input'), true);

// python argument must be in quotes - commands have < as start character
// that causes error bash: argv: No such file or directory
$str = "python Drivers/rs232_simulator.py " . chr(39) . $command['serStr'] . chr(39);

exec($str, $output);

//echo array as string back to javascript - ajax call response
echo $output[0];


?>



