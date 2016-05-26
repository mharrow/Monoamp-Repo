<?php

// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// json from javascript client
$command = json_decode(file_get_contents('php://input'), true);

$table = $command[0];
$field = $command[1];
$fieldValue = $command[2];
$pk = $command[3];
$pkValue = $command[4];

// python argument must be in quotes 
$str = sprintf("python Drivers/my_sql_update.py " . "'" . $table. " ' " . "'"$field "' ". "'"$fieldValue" ' " . "'"$pk" ' " . "'"$pkValue"'");

exec($str, $output);

//echo array as string back to javascript - ajax call response
echo $output[0];

?>