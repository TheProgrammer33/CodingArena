#!/bin/bash
>questionsOutput.txt
mysql -u morecoffee -pspot123 -D competition -e 'SELECT questionNum, questionText FROM questions' 1> /opt/bitnami/apache2/htdocs/php/questionsOutput.txt
#echo '|' >>adminOutput.txt
#mysql -u morecoffee -pspot123 -D competition -e 'SELECT name FROM admin' 1>> adminOutput.txt
