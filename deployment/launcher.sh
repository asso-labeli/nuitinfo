#!/usr/bin/env bash

if [[ $# -eq 0 ]]
then
    echo "Usage"
    echo "./launcher.sh generate"
    echo "./launcher.sh build"
    echo "./launcher.sh run"
    echo "./launcher.sh logs"
    echo "./launcher.sh run [port]"
else
    if [ ${1} = "generate" ]
    then
        echo "Dockerfile generation in progress"
        cp DockerTemplate Dockerfile
        echo "You can build now"
    else
        if [ ${1} = "build" ]
        then
            echo "Docker build in progress"
            docker build . -t nuitinfo
        else
            if [ ${1} = "logs" ]
            then
                docker logs -f ndi
            else
                if [ ${1} = "run" ]
                then
                    echo "Docker launch in progress"
                    docker rm -f ndi
                    if [ $# -eq 2 ]
                    then
                        docker run -p 8080:${2} --name ndi -d nuitinfo
                    else
                        docker run -p 8080:8080 --name ndi -d nuitinfo
                    fi
                else
                    echo "Usage"
                    echo "./launcher.sh generate"
                    echo "./launcher.sh build"
                    echo "./launcher.sh run"
                    echo "./launcher.sh logs"
                    echo "./launcher.sh run [port]"
                fi
            fi
        fi
    fi
fi