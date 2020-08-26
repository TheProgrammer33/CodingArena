<?php
$email = $_GET["email"];
$pass = $_GET["password"];
$cmd = ("./bashScripts/checkPass.sh " . $email);
$output = exec($cmd);
$result = file_get_contents('/opt/bitnami/apache2/htdocs/php/textFiles/tmpPass.txt');
$result = trim($result);
if (strcmp($pass, $result) == 0) {
	echo "true";
}
else {
	echo "false";
}
$output = exec("sudo echo '' > textFiles/tmpPass.txt");
?>
