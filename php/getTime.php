<?php
$comp = $_GET["name"];
$comp = str_replace(" ", "_", $comp);
$cmd = "/opt/bitnami/apache2/htdocs/php/bashScripts/pullTime.sh " . $comp;
$output = exec($cmd);
$msg = file_get_contents("textFiles/timeOutput.txt");
echo $msg;
?>
