#!/bin/bash

if [ $# -ne 4 ]
	echo "Usage: name email password permissions"
then
	mysql -u morecoffee -pspot123 -D competition -e "DELETE FROM admin WHERE email='$2'"	
	mysql -u morecoffee -pspot123 -D competition -e "INSERT INTO admin VALUES('$1', '$2', '$3', '$4', null)"
	mysql -u morecoffee -pspot123 -D competition -e "Select * from admin"
fi
echo "script run successfully"
