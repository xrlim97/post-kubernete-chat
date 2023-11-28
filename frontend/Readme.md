# Docker Container

## Building docker container

Command:

* docker build -t chat/fronend .

## Runnig docker container

Command: 

### docker run -p HostPort:InternalPort chat/frontend

Example:

docker run -p 8080:8080 chat/frontend

Default port for backend is 8080

### Local run 

REACT_APP_WS_DOMAIN=api.chat-test.com PORT=7777 npm start

### add user to docker group

sudo groupadd docker
sudo gpasswd -a $USER docker

newgrp docker or log out from user