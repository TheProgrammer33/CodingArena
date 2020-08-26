<?php
$cmd = "/opt/bitnami/apache2/htdocs/php/bashScripts/pullAdmin.sh";
$output = exec($cmd);
$msg = file_get_contents("textFiles/adminOutput.txt");
echo $msg;
?>
