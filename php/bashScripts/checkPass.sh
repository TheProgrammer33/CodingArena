#!/bin/bash
mysql -u morecoffee -pspot123 -D competition -e "SELECT password FROM admin WHERE email='$1'" > /opt/bitnami/apache2/htdocs/php/textFiles/tmpPass.txt
sed -i '1d' /opt/bitnami/apache2/htdocs/php/textFiles/tmpPass.txt
#echo '|' >>adminOutput.txt
#mysql -u morecoffee -pspot123 -D competition -e 'SELECT name FROM admin' 1>> adminOutput.txt
