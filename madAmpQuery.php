<?php
//
// hostname, username, password - set them according to your setup
//

$command = $_POST['queryDb']

$link = mysql_connect("localhost", "root", "udooer");

mysql_select_db("madAmp");
	
//$query = "SELECT * FROM ".$command;
$query = "SELECT * FROM `zones` LIMIT 0,6";
$result = mysql_query($query);
$data = array();

while(($row = mysql_fetch_assoc($result))) {
	$data[] = $row['data'];
}

mysql_close($link);

echo $data;

?>
