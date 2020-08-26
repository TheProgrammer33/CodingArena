<?php
$name = $_GET['name'];
$comp = $_GET['comp'];
$name = str_replace(" ", "_", $name);
$comp = str_replace(" ", "_", $comp);
$output = exec("./bashScripts/addTeam.sh '$name' '$comp'");
echo $output;
?>
