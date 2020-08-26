<?php
$cmd = "/opt/bitnami/apache2/htdocs/php/bashScripts/pullCompetition.sh";
$output = exec($cmd);
$msg = file_get_contents("textFiles/competitionOutput.txt");
$msg = str_replace("_", " ", $msg);
echo $msg;
?>
