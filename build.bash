#!/bin/bash

CWD="`pwd`";

CLIENT_IMAGE_NAME="react-client"
CLIENT_BUILD_DIR="client"

SERVER_IMAGE_NAME="url-mapper-server"
SERVER_BUILD_DIR="server"

STACK_NAME="url-mapper"

echo "Clearing..."

# remove stack 
sudo docker stack rm $STACK_NAME;

# leave swarm 
sudo docker swarm leave --force;

# remove images
sudo docker image rm $CLIENT_IMAGE_NAME;
sudo docker image rm $SERVER_IMAGE_NAME;

echo "Done clearing."

echo "Building..."

# Build images
sudo docker build -t $CLIENT_IMAGE_NAME "$CWD/$CLIENT_BUILD_DIR";
sudo docker build -t $SERVER_IMAGE_NAME "$CWD/$SERVER_BUILD_DIR";

echo "Done building."

echo "Deploying stack"

# Init swarm 
sudo docker swarm init

# Deploy stack 
sudo docker stack deploy -c docker-compose.yml $STACK_NAME;
echo "Done."

