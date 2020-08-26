<?php
	$csv=file_get_contents('textFiles/testCSV.csv');
	$rows=explode("\n", $csv);
	#array_shift($rows);

	$var1="hello";
	$var2="hello";

	$int=strcmp($var1, $var2);

	echo $int;

	foreach($rows as $row => $data)
	{
		#$row_data=explode('^', $data);
		if($row==count($rows)-1)
			break;
		echo 'line num: ' . $row . "\n";
		echo 'contents: ' . $data . "\n";
	}


	echo "IO: \n";
	foreach($rows as $row => $data)
	{
		if($row==count($rows)-1)
			break;
		$io=$data;
		$io=str_replace(",","\n",$data);

		$ioArray=explode("\n",$io);

		foreach($ioArray as $line => $item)
		{
			echo $item . "\n";
		}

		$input=$ioArray[0];
		$output=$ioArray[1];

		echo "Input: " . $input . "\n";
		echo "Output: " . $output . "\n";
	}

	echo "Parse by comma: \n";
	foreach($rows as $row => $data)
	{
		if($row==count($rows)-1)
			break;
		$rows[$row]=str_replace(",","\n",$data);
		echo $rows[$row] . "\n";
	}
?>
