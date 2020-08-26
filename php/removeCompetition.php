<?php
$comp = $_GET['name'];
$comp = str_replace(" ", "_", $comp);
$output = exec("./bashScripts/removeCompetition.sh '$comp'");
echo $output;
?>
