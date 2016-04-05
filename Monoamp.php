<?php

// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// The JSON standard MIME header.
// header('Content-type: application/json');
// ini_set('display_errors', '1');
define("PORT","/dev/ttyMCC");

include "php_serial.class.php";

$str = $_POST['serStr'];	
	
$serial = new phpSerial;
$serial->deviceSet(PORT);
$serial->confBaudRate(115200);
$serial->confParity("none");
$serial->confStopBits(1);
$serial->confFlowControl("none");
$serial->confCharacterLength(8);

$serial->deviceOpen();

usleep(250000);
	
$serial->sendMessage($str);

usleep(250000);
$read = $serial->readPort();

$serial->deviceClose();

//echo json_endcode($read);
//echo "true";
echo $read;
?>



