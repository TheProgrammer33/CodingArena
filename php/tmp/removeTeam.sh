#!/bin/bash

if [ $# -ne 1 ]
	echo "Usage: #0 name"
then
	mysql -u morecoffee -pspot123 -D competition -e "DELETE FROM leaderboard WHERE teamName='$1'"	
	mysql -u morecoffee -pspot123 -D competition -f "DROP table $1Table"
	rm /opt/bitnami/apache2/htdocs/php/$1Output.txt
	rm /opt/bitnami/apache2/htdocs/php/$1Error.txt
fi
echo "script run successfully"
