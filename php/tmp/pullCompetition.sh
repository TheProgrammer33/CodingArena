#!/bin/bash
>competitionOutput.txt
mysql -u morecoffee -pspot123 -D competition -e 'SELECT compName, compStartTime, compEndTime, compID FROM comp' 1> /opt/bitnami/apache2/htdocs/php/competitionOutput.txt
#echo '|' >>adminOutput.txt
#mysql -u morecoffee -pspot123 -D competition -e 'SELECT name FROM admin' 1>> adminOutput.txt
