<?php
$email = $_GET['email'];
$output = exec("./bashScripts/removeAdmin.sh '$email'");
echo $output;
?>
