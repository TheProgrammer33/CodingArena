#!/bin/bash

if [ $# -ne 1 ]
	echo "Usage: #0 email"
then
	mysql -u morecoffee -pspot123 -D competition -e "DELETE FROM admin WHERE email='$1'"
fi
echo "script run successfully"
