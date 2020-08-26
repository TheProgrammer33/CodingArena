<?php
if (true) {
	$MYPATH = '/opt/bitnami/apache2/htdocs/php';
	#$postdata = file_get_contents("php://input");
	#$request = json_decode($postdata);
	$code = file_get_contents('textFiles/testInOutCS.txt');
	$teamName = 'TESTINGTEAM';
	$language = 'C#';
	#$question = $request->question;
	#$competition = $request->competition;
	$teamName = str_replace(' ', '', $teamName);
	$fileName = $MYPATH . "/textFiles/" . $teamName . "Input.txt";
	$file = fopen($fileName, 'wb');
	fwrite($file, $code);
	fclose($file);
	if($language == 'C++')
	{
		$cmd = ("sh " . $MYPATH . "/bashScripts/compilers/runCpp " . $fileName . " 2> stderr.txt");
		$output = exec($cmd);
	}
	elseif($language == 'C')
	{
		$cmd = ("sh " . $MYPATH . "/bashScripts/compilers/runC " . $fileName . " 2> stderr.txt");
		$output = exec($cmd);
	}
	elseif($language == 'C#')
	{
		$csvFile=file_get_contents('textFiles/testCSV.csv');
		$rows=explode("\n", $csvFile);

		foreach($rows as $row => $data)
		{
			if ($row==count($rows)-1)
				break;
			$io=str_replace(",","\n",$data);

			$ioArray=explode("\n", $io);

			$input=$ioArray[0];
			$expectedOutput=$ioArray[1];
			
			$file = fopen("input.txt", "wb");
			fwrite($file,$input);
			fclose($file);

			$cmd = ("sh " . $MYPATH . "/bashScripts/compilers/testRunCS " . $fileName . " 2> stderr.txt");
			#$output = exec($cmd);
			exec($cmd);
			$output = file_get_contents('output.txt');
			$output=str_replace("\n","",$output);
			#echo $output;

			if(strcmp($output, $expectedOutput)==0)
			{
				echo "Success" . "\n";
				echo "Output: " . $output . "\n";
				echo "Expected Output: " . $expectedOutput . "\n";
			}
			else
			{
				echo "Failed" . "\n";
				echo "String 1: " . $output . "\n" . "String 2: " . $expectedOutput . "\n";
			}	
		}
	}
	elseif($language == 'Python 2.7')
	{
		$cmd = ("sh /opt/bitnami/apache2/htdocs/php/bashScripts/compilers/runPy " . $fileName . " 2> stderr.txt");
		$output = exec($cmd);
	}
	elseif($language == 'Python 3.7')
	{
		$cmd = ("sh " . $MYPATH . "/bashScripts/compilers/runPy3 " . $fileName . " 2> stderr.txt");
		$output = exec($cmd);
	}
	elseif($language == 'Java')
	{
		$cmd = ("sh " . $MYPATH . "/bashScripts/compilers/runJava " . $fileName . " 2> stderr.txt");
		$output = exec($cmd);
	}
	else
	{
		echo "ERROR";
	}
}
else {
	echo "Data is null";
}
$error = file_get_contents("/opt/bitnami/apache2/htdocs/php/errors.txt");
$out = file_get_contents("/opt/bitnami/apache2/htdocs/php/output.txt");

$msg = $error . "\r\n" . $out;
echo $msg;

?>
