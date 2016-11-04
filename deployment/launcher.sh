#!/usr/bin/env bash

if [ ${1} -eq "generate" ]
then
    echo "Dockerfile generation in progress"
else
    if [ ${1} -eq "build" ]
    then
        echo "Docker build in progress"
    else
        if [ ${1} -eq "launch" ]
        then
            echo "Docker launch in progress"
        else
            echo "Usage"
        fi
    fi
fi