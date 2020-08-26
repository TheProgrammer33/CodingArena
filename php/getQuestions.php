<?php
$comp = $_GET['competition'];
$comp = str_replace(" ", "_", $comp);
$cmd = "./bashScripts/pullQuestions.sh '" . $comp . "'"; 
$output = exec($cmd);
$msg = file_get_contents("textFiles/questionsOutput.txt");
echo $msg;


?>
