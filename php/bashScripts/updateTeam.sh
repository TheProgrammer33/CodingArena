#!/bin/bash

if [ $# -ne 3 ]
	echo "Usage: name compName questionNum"
then
	mysql -u morecoffee -pspot123 -D $2 -e "DELETE FROM $1table WHERE questionID=$3"	
	mysql -u morecoffee -pspot123 -D $2 -e "INSERT INTO $1table VALUES($3, 'yes', 10, 0)"
	NUMBER=$(mysql -u morecoffee -pspot123 -D $2 -e "SELECT SUM(points) FROM $1table" | tr -dc '0-9')
	mysql -u morecoffee -pspot123 -D $2 -e "UPDATE leaderboard SET points=$NUMBER WHERE teamName='$1'"
fi
echo "script run successfully"
