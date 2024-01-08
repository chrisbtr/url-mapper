# URL Mapper

## Project Description
A web application that when a user submits a valid URL and a `key` will redirect the user to the URL when going to `/m/key` path in the web app.  

## Technologies Used
### Client (frontend)
- ReactJS
- TypeScript
- React Router
- MUI
- Axios
- Jest
- Docker

### Server (backend)
- Django
- Python
- Redis
- Docker

## Requirements
- Docker
- **Note:** This project was built and tested on **WSL2 (Ubuntu)**

## Setup
### Step 1
- Run `cp server/config/config/.env.sample server/config/config/.env`

### Step 2
- Update the variables in `server/config/config/.env`
- **NOTE:** the examples should be correct if you replace `localhost` with the IP that your docker swarm is running on. 

### Step 3
- Run `cp client/app/.env.sample client/app/.env`

### Step 4 
- Update the variables in `client/app/.env`
- **NOTE:** the examples should be correct if you replace `localhost` with the IP that your docker swarm is running on. 

### Running The Application
- Run the `build.bash` bash script
- After running this script the the `client side` should be hosted on port `3000` and the `server side` should be hosted on port `8000`.
- **Note:** There is also a docker service visualizer running on port `8080`

### Stopping The Application
- Run the `clear.bash` bash script

## Notes
- This project is Intended to demonstrate my abilities with certain technologies, and is **NOT** intended to be used in a production.