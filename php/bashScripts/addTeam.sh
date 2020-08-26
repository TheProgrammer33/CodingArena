#!/bin/bash

if [ $# -ne 1 ]
	echo "Usage: name compID"
then
	mysql -u morecoffee -pspot123 -D $2 -e "DELETE FROM leaderboard WHERE teamName='$1'"	
	mysql -u morecoffee -pspot123 -D $2 -e "INSERT INTO leaderboard VALUES('$1', 0, null, '$1Output.txt', '$1Error.txt')"
	>/opt/bitnami/apache2/htdocs/php/textFiles/$1Output.txt
	>/opt/bitnami/apache2/htdocs/php/textFiles/$1Error.txt
	mysql -u morecoffee -pspot123 -D $2 -e "CREATE TABLE $1Table LIKE teamtemplate"
fi
echo "script run successfully"
