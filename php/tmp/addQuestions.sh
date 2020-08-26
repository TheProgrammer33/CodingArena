#!/bin/bash
if [ $# -ne 3 ]
	echo error
then
	mysql -u morecoffee -pspot123 -D competition -e "Delete from questions where compFK=$3 AND questionNum>=$1"
	mysql -u morecoffee -pspot123 -D competition -e "INSERT INTO questions VALUES( $1 , '$2', 'question$1.csv', $3, null)"
fi
