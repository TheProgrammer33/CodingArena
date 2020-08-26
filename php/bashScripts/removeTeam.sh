#!/bin/bash

if [ $# -ne 1 ]
	echo "Usage: #0 name"
then
	mysql -u morecoffee -pspot123 -D $2 -e "DELETE FROM leaderboard WHERE teamName='$1'"	
	mysql -u morecoffee -pspot123 -D $2 -f "DROP table $1Table"
	rm /opt/bitnami/apache2/htdocs/php/textFiles/$1Output.txt
	rm /opt/bitnami/apache2/htdocs/php/textFiles/$1Error.txt
fi
echo "script run successfully"
