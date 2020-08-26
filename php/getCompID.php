<?php
$comp = $_GET["name"];
$comp = str_replace(" ", "_", $comp);
$cmd = "/opt/bitnami/apache2/htdocs/php/bashScripts/pullCompID.sh '" . $comp . "'";
$output = exec($cmd);
$msg = file_get_contents("textFiles/compIdOutput.txt");
echo $msg;
?>
