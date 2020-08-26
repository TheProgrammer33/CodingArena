<?php
$comp = $_GET["competition"];
$comp = str_replace(" ", "", $comp);
$cmd = "./bashScripts/pullTeam.sh '" . $comp . "'";
$output = exec($cmd);
$msg = file_get_contents("textFiles/teamOutput.txt");
$msg = str_replace("_", " ", $msg);
echo $msg;
?>
