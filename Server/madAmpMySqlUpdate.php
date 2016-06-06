<?php

// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');
$json = "'".file_get_contents('php://input')."'";

// json from javascript client
$command = json_decode(file_get_contents('php://input'), true);

$test_response = $command[fieldValue];

 if (strpos($command[field], "Name") !== false) {
	$str = sprintf("python Drivers/my_sql_update.py " . $command[tableName] . " " . $command[field] . " '" . $command[fieldValue] ."' ". $command[pk] . " " . $command[pkValue]);
 } elseif (strpos($command[tableName], "attributes") !== false) {
	$str = sprintf("python Drivers/my_sql_update.py " . $command[tableName] . " " . $command[field] . " " . $command[fieldValue] ." ". $command[pk] . " '" . $command[pkValue] . "'");
 } else {
	 $str = sprintf("python Drivers/my_sql_update.py " . $command[tableName] . " " . $command[field] . " " . $command[fieldValue] ." ". $command[pk] . " " . $command[pkValue]);
 }

exec($str, $output);

//echo array as string back to javascript - ajax call response
if ($output[0] == $test_response) {
	echo (json_encode($command));
} else {
	echo (json_encode($output));
}

?>
