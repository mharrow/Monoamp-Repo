<?php

// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// json from javascript client
$command = json_decode(file_get_contents('php://input'), true);

$table = $command[1];
$field = $command[2];
$fieldValue = $command[3];
$pk = $command[4];
$pkValue = $command[5];

$str = "python Drivers/my_sql_update.py " . "'" . $table. " ' " . "'"$field "' ". "'"$fieldValue" ' " . "'"$pk" ' " . "'"$pkValue"'"
// python argument must be in quotes 
// $str = "python Drivers/my_sql_update.py " . chr(39) . $command['serStr'] . chr(39);

exec($str, $output);

//echo array as string back to javascript - ajax call response
echo $output[0];


?>
