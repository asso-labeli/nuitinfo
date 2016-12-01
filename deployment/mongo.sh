#!/usr/bin/env bash

if [[ $# -eq 0 ]]; then
    echo "Usage"
    echo "./mongo.sh install"
    echo "./mongo.sh install-secure"
    echo "./mongo.sh logs"
elif [ ${1} = "install" ]; then
    docker run -p 27017:27017 --name mongo-ndi -d mongo
elif [ ${1} = "install-secure" ]; then
    docker run -p 27017:27017 --name mongo-secure-ndi -d mongo
elif [ ${1} = "logs" ]; then
    docker logs -f mongo-ndi
fi