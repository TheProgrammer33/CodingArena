#!/bin/bash
if [ $# -ne 3 ]
	echo error
then
	mysql -u morecoffee -pspot123 -D $3 -e "Delete from questions where questionNum>=$1"
	mysql -u morecoffee -pspot123 -D $3 -e "INSERT INTO questions VALUES( $1 , '$2', 'question$1.csv', null)"
fi
