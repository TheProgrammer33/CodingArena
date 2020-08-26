<?php
$name = $_GET['name'];
$startTime = $_GET['start'];
$endTime = $_GET['end'];
$id = crc32($name);
$name = str_replace(" ", "_", $name);
echo $id;
$output = exec("./bashScripts/addCompetition.sh '$name' '$startTime' '$endTime' '$id'");
?>
