<?php

// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// json from javascript client
$command = json_decode(file_get_contents('php://input'), true);

// python argument must be in quotes 
$str = sprintf("python Drivers/my_sql_update.py " . $command[tableName] . " " . $command[field] . " " . $command[fieldValue] ." ". $command[pk] . " " . $command[pkValue]);

exec($str, $output);

//echo array as string back to javascript - ajax call response

echo (json_encode($command));

?>
