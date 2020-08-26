<?php
$team = $_GET['name'];
$comp = $_GET['competition'];
$team = str_replace(" ", "_", $team);
$comp = str_replace(" ", "_", $comp);
$output = exec("./bashScripts/removeTeam.sh '$team' '$comp'");
echo $output;
?>
