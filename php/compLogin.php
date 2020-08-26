<?php
$id = $_GET["id"];
$cmd = ("./bashScripts/checkID.sh " . $id);
$output = exec($cmd);
$result = file_get_contents('/opt/bitnami/apache2/htdocs/php/textFiles/tmpID.txt');
if (strcmp($result, "") != 0) {
	echo "true";
	$result = str_replace("_", " ", $result);
	echo $result;
}
else {
	echo "false";
}
$output = exec("sudo echo '' > textFiles/tmpID.txt");
?>
