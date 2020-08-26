<?php
$name = $_GET['name'];
$email = $_GET['email'];
$password = $_GET['pass'];
echo $password;
$output = exec("./bashScripts/addAdmin.sh '$name' $email '$password' Administrator ");
echo $output;
?>
