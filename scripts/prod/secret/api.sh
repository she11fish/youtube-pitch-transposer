#!/bin/bash
env_path=./server/.env.prod
source $env_path

for key in $(grep -vE '^\s*#' $env_path | grep '=' | cut -d '=' -f1)
do
  echo "${!key}" > "./secrets/${key,,}.txt"
done