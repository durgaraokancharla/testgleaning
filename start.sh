#!/bin/bash

. ./loadconf
pid=`ps -ef | grep [n]ode | awk '{print $2}'`

if [ -n "$pid" ]
then

echo "parse server is running with pid $pid"
ps -ef | grep [n]ode

else

npm start &>> node.log &
fi
exit
