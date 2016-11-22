#!/usr/bin/env bash

if [[ $# -eq 0 ]]; then
    echo "Usage"
    echo "./launcher.sh generate"
    echo "./launcher.sh build"
    echo "./launcher.sh run"
    echo "./launcher.sh run [port]"
    echo "./launcher.sh logs"
    echo "./launcher.sh enter"

elif [ ${1} = "generate" ]; then
    echo "Dockerfile generation in progress"
    cp DockerTemplate Dockerfile
    echo "You can build now"

elif [ ${1} = "build" ]; then
    echo "Docker build in progress"
    docker build . -t nuitinfo

elif [ ${1} = "logs" ]; then
    docker logs -f ndi

elif [ ${1} = "enter" ]; then
    docker exec -ti ndi /bin/bash

elif [ ${1} = "run" ]; then
    echo "Docker launch in progress"
    docker rm -f ndi
    if [ $# -eq 2 ]; then
        docker run -p 8080:${2} --name ndi -d nuitinfo
    else
        docker run -p 8080:8080 --name ndi -d nuitinfo
    fi

else
    echo "Usage"
    echo "./launcher.sh generate"
    echo "./launcher.sh build"
    echo "./launcher.sh run"
    echo "./launcher.sh run [port]"
    echo "./launcher.sh logs"
    echo "./launcher.sh enter"
fi