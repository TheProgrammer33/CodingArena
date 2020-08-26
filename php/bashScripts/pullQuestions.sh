#!/bin/bash
>textFiles/questionsOutput.txt
mysql -u morecoffee -pspot123 -D $1 -e 'SELECT questionNum, questionText FROM questions' 1> /opt/bitnami/apache2/htdocs/php/textFiles/questionsOutput.txt
#echo '|' >>adminOutput.txt
#mysql -u morecoffee -pspot123 -D competition -e 'SELECT name FROM admin' 1>> adminOutput.txt
