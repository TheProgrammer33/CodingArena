<?php
$postdata = file_get_contents("php://input");
if (!empty($postdata)) {
	$MYPATH = '/opt/bitnami/apache2/htdocs/php';
	$request = json_decode($postdata);
	$code = $request->code;
	$teamName = $request->team;
	$language = $request->language;
	$question = $request->question;
	$competition = $request->competition;
	$teamName = str_replace(' ', '_', $teamName);
	$id = crc32($competition);
	$competition = str_replace(' ', '_', $competition);
	$fileName = $MYPATH . "/textFiles/" . $teamName . "Input.txt";
	$file = fopen($fileName, 'wb');
	fwrite($file, $code);
	fclose($file);
	$csvFilename = "csvFiles/" . $id . "question" . $question . ".csv";
	if($language == 'C++')
	{
		$compilecmd = ("sh " . $MYPATH . "/bashScripts/compilers/runCpp " . $fileName . " 2> stderr.txt");
	}
	elseif($language == 'C')
	{
		$compilecmd = ("sh " . $MYPATH . "/bashScripts/compilers/runC " . $fileName . " 2> stderr.txt");
	}
	elseif($language == 'C#')
	{
		$compilecmd = ("sh " . $MYPATH . "/bashScripts/compilers/runCS " . $fileName . " 2> stderr.txt");
	}
	elseif($language == 'Python 2.7')
	{
		$compilecmd = ("sh /opt/bitnami/apache2/htdocs/php/bashScripts/compilers/runPy " . $fileName . " 2> stderr.txt");
	}
	elseif($language == 'Python 3.7')
	{
		$compilecmd = ("sh " . $MYPATH . "/bashScripts/compilers/runPy3 " . $fileName . " 2> stderr.txt");
	}
	elseif($language == 'Java')
	{
		$compilecmd = ("sh " . $MYPATH . "/bashScripts/compilers/runJava " . $fileName . " 2> stderr.txt");
	}
	else
	{
		echo "ERROR";
	}
	$csvFile = file_get_contents($csvFilename);
	$rows= explode("\n", $csvFile);
	$correct = "Success!\n";
	foreach($rows as $row => $data)
	{
		$testCorrect = "Success!\n";
		if ($row==count($rows)-1)
			break;
		$io=str_replace(",","\n",$data);
		$ioArray = explode("\n", $io);
		$input = $ioArray[0];
		$expectedOutput = $ioArray[1];

		$file = fopen("input.txt", "wb");
		fwrite($file, $input);
		fclose($file);
		exec($compilecmd);
		$output = file_get_contents('output.txt');
		$output = str_replace("\n","",$output);
		#echo "Output: " . $output . "        ";
		if(strcmp($output, $expectedOutput)!=0)
		{
			$correct = "Failed\n";
			$testCorrect = "Failed\n";
		}
		echo "Test " . $row . ": " . $testCorrect . "        ";
	}

	if(strcmp($correct, "Success!\n") == 0) {
		$cmd = "./bashScripts/updateTeam.sh " . $teamName . " " . $competition . " " . $question;
		exec($cmd);
	}
}
else {
	echo "Data is null";
}
$error = file_get_contents("/opt/bitnami/apache2/htdocs/php/errors.txt");
echo $error;

?>
