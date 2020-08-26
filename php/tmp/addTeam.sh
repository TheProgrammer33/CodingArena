#!/bin/bash

if [ $# -ne 1 ]
	echo "Usage: name compID"
then
	mysql -u morecoffee -pspot123 -D competition -e "DELETE FROM leaderboard WHERE teamName='$1'"	
	mysql -u morecoffee -pspot123 -D competition -e "INSERT INTO leaderboard VALUES('$1', 0, null, $2, '$1Output.txt', '$1Error.txt')"
	>/opt/bitnami/apache2/htdocs/php/$1Output.txt
	>/opt/bitnami/apache2/htdocs/php/$1Error.txt
	mysql -u morecoffee -pspot123 -D competition -e "CREATE TABLE $1Table LIKE teamtemplate"
	mysql -u morecoffee -pspot123 -D competition -e "Select * from leaderboard"
fi
echo "script run successfully"
