#!/bin/bash

MyName=$(basename $0)

if [ $# -gt 0 ] ; then
 cat <<EOF
Usage: $MyName
EOF
 exit 0
fi

pid=`ps -ef | grep [n]ode | awk '{print $2}'`
if [ ! -z "$pid" ]
then
ps -ef | grep '[P]'arse-Server
echo "Killing process : $pid"
kill -9 $pid
else
echo "parse server is not running"
fi
