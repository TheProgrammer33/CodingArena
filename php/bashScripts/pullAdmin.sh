#!/bin/bash
>textFiles/adminOutput.txt
mysql -u morecoffee -pspot123 -D competition -e 'SELECT name, email, permissions FROM admin' 1> /opt/bitnami/apache2/htdocs/php/textFiles/adminOutput.txt
#echo '|' >>adminOutput.txt
#mysql -u morecoffee -pspot123 -D competition -e 'SELECT name FROM admin' 1>> adminOutput.txt
