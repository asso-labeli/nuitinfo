#!/usr/bin/env bash

if [[ $# -eq 0 ]]
then
    echo "Usage"
    echo "./mongo.sh install"
    echo "./mongo.sh logs"
else
    if [ ${1} = "install" ]
    then
        docker run -p 27017:27017 --name mongo-ndi -d mongo
    else
        if [ ${1} = "logs" ]
        then
            docker logs -f mongo-ndi
        fi
    fi
fi