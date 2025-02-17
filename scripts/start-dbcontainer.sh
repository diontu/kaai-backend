#!/bin/bash

# import variables
source $(dirname $0)/vars.sh

# assumes you have docker installed
docker start $MYSQL_CONTAINER_NAME

RESPONSE=$?

if [ $RESPONSE -eq 0 ]; then
    echo ""
    echo "Container $MYSQL_CONTAINER_NAME started."
    exit 0
fi

# error of 1 means container is not found.
if [ $RESPONSE -eq 1 ]; then
    echo ""
    echo "Container $MYSQL_CONTAINER_NAME not found. Creating container..."
    docker run --name $MYSQL_CONTAINER_NAME -e MYSQL_ROOT_PASSWORD=$MYSQL_PASSWORD -d -p 3306:3306 mysql
    echo ""
    echo "Container $MYSQL_CONTAINER_NAME created."
fi