#!/bin/sh

/app/wait.sh mysql:3306

cd /app

npm start
