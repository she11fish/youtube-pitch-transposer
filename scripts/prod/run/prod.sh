#!/bin/bash
docker stack deploy -c docker-compose.prod.yml --detach=false prod 