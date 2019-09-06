#!/bin/bash

pid=`ps -ef | grep [n]ode | awk '{print $2}'`

if [ -z "$pid" ]
then

cd /usr/local/gleaning-backend/gleaning

tail -n 500 node.log | mailx -s "Node logs before restart" yravikanth@gmail.com,durgarao41@gmail.com,venkatakrishnachaparala@gmail.com,makani.prudhviraj@gmail.com,pattanayak.raja@gmail.com  

. ./loadconf
npm start >> node.log &

else
exit

fi
exit
