#!/bin/bash
>/opt/bitnami/apache2/htdocs/php/textFiles/competitionOutput.txt
mysql -u morecoffee -pspot123 -D competition -e 'SELECT compName, compTime, compEnd, compID FROM comp' 1> /opt/bitnami/apache2/htdocs/php/textFiles/competitionOutput.txt
#echo '|' >>adminOutput.txt
#mysql -u morecoffee -pspot123 -D competition -e 'SELECT name FROM admin' 1>> adminOutput.txt
