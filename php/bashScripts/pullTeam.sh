#!/bin/bash
> /opt/bitnami/apache2/htdocs/php/textFiles/teamOutput.txt
mysql -u morecoffee -pspot123 -D $1 -e 'SELECT teamName, points FROM leaderboard' 1> /opt/bitnami/apache2/htdocs/php/textFiles/teamOutput.txt
#echo '|' >>adminOutput.txt
#mysql -u morecoffee -pspot123 -D competition -e 'SELECT name FROM admin' 1>> adminOutput.txt
