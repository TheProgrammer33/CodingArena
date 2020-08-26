<?php
$postdata = file_get_contents("php://input");
if (!empty($postdata)) {
	$request = json_decode($postdata);
	$qText = $request->questions;
	$csv = $request->file;
	$comp = $request->competition;
	$compNum = crc32($comp);
	$comp = str_replace(" ", "", $comp);
	$qText = addslashes($qText);
	print_r(explode(';', $qText));
	$qText = explode(';', $qText);
	$csv = str_replace("data:text/csv;base64,", '', $csv);
	$csv = str_replace("data:application/octet-stream;base64,", '', $csv);
	echo $csv;
	$csv = str_replace("=", '', $csv);
	$csv = explode(';', $csv); 
	for ($i = 0; $i < count($qText); $i++) {
		$csvName = "/opt/bitnami/apache2/htdocs/php/csvFiles/" . $compNum . "question" . $i . ".csv";
		echo base64_decode($csv[$i]);
		file_put_contents($csvName, base64_decode($csv[$i]));
		$cmd = './bashScripts/addQuestions.sh ' . $i . ' \'' . $qText[$i] . '\' \'' . $comp . '\'';
		exec($cmd);
	}
}
else {
	echo "data is null";
}
?>
