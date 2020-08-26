#!/bin/bash

if [ $# -ne 1 ]
	echo "Usage: #0 name"
then
	mysql -u morecoffee -pspot123 -e "DROP DATABASE $1"
	mysql -u morecoffee -pspot123 -D competition -e "DELETE FROM comp WHERE compName=$1"
fi
echo "script run successfully"
