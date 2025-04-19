#!/bin/bash
# PRECONDITION: assumes at most one container is running
container_id=$(docker ps --filter ancestor=youtubepitchtransposer-api --format "{{.ID}}")
if [ -z "$container_id" ]; then
    echo "No running container found for youtubepitchtransposer-api."
    exit 1
fi
if [ $# -eq 0 ]; then
    docker exec -it "$container_id" /bin/sh
    exit 1
fi
docker exec -u $1 -it "$container_id" /bin/sh