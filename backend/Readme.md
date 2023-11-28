# Docker Container

## Building docker container

Command:

* docker build -t chat/backend .

## Runnig docker container

Command: 

### docker run -p HostPort:InternalPort chat/backend

Example:

docker run -p 8080:8080 chat/backend

Default port for backend is 8080

### docker run -e PORT=InternalPort -p HostPort:InternalPort chat/backend

Example:

docker run -e PORT=4000 -p 4000:4000 chat/backend

overrides default port from 8080 to 4000


# Local Run

PORT=7777 npm start


### docker run -e REACT_APP_WS_PORT=WebScketPort -e PORT=InternalPort -p HostPort:InternalPort chat/backend

Example:

docker run -e REACT_APP_WS_PORT=4000 PORT=7000 -p 3000:7000 chat/backend

overrides default port from 3000 to 7000