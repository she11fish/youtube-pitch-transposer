#!/bin/bash
if [ $# -eq 0 ]; then
    docker run -it youtubepitchtransposer-api /bin/sh
    exit 1
fi
echo "Running docker with user $1"
docker run -u $1 -it youtubepitchtransposer-api /bin/sh