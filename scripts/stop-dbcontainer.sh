#!/bin/bash

# import variables
source $(dirname $0)/vars.sh

# assumes you have docker installed
docker container stop $MYSQL_CONTAINER_NAME

if [ $? -eq 0 ]; then
    echo "Container $MYSQL_CONTAINER_NAME stopped."
    exit 0
fi