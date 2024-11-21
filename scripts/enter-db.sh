#!/bin/bash

# import variables
source $(dirname $0)/vars.sh

# assumes you have docker installed
docker exec -it $MYSQL_CONTAINER_NAME mysql -u root -p