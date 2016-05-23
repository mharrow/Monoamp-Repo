<?php

// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// json from javascript client
$command = json_decode(file_get_contents('php://input'), true);

// TODO: extract fields from JSON to build python command line arguments

// python argument must be in quotes 
$str = "python Drivers/my_sql_update.py " . chr(39) . $command['serStr'] . chr(39);

exec($str, $output);

//echo array as string back to javascript - ajax call response
echo $output[0];


?>
