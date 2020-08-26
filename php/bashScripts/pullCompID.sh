#!/bin/bash
>/opt/bitnami/apache2/htdocs/php/textFiles/compIdOutput.txt
mysql -u morecoffee -pspot123 -D competition -e "SELECT compID FROM comp WHERE compName='$1'" 1> /opt/bitnami/apache2/htdocs/php/textFiles/compIdOutput.txt
#echo '|' >>adminOutput.txt
#mysql -u morecoffee -pspot123 -D competition -e 'SELECT name FROM admin' 1>> adminOutput.txt
