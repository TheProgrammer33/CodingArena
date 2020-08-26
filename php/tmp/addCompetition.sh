#!/bin/bash
mysql -u morecoffee -pspot123 -e "CREATE DATABASE $1"
mysqldump -u morecoffee -pspot123 competitiontemplate | mysql -u morecoffee -pspot123 $1
mysql -u morecoffee -pspot123 -D $1 -e "INSERT INTO comp VALUES('$1', '$2', '$3', '$4')"
mysql -u morecoffee -pspot123 -D competition -e "INSERT INTO comp VALUES('$1', '$2', '$3', '$4')"
