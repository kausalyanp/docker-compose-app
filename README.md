# docker-compose-app
Here’s a sample docker-compose.yml file for a multi-container application setup. This example includes a web application using Node.js, a database using MySQL, and a reverse proxy using NGINX.

docker-compose.yml
```
version: "3.9"  # Specify the version of Docker Compose

services:
  app:
    image: node:16  # Node.js base image
    container_name: node_app
    working_dir: /usr/src/app
    volumes:
      - ./app:/usr/src/app  # Mount local code to the container
    ports:
      - "3000:3000"  # Expose the app on port 3000
    command: "npm start"  # Command to start the Node.js app
    depends_on:
      - db  # Ensure the database is running before the app starts
    environment:
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: password
      DB_NAME: my_database

  db:
    image: mysql:8
    container_name: mysql_db
    ports:
      - "3306:3306"  # Expose MySQL port
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: my_database
      MYSQL_USER: root
      MYSQL_PASSWORD: password
    volumes:
      - db_data:/var/lib/mysql  # Persist database data

  nginx:
    image: nginx:latest
    container_name: nginx_proxy
    ports:
      - "80:80"  # Expose HTTP on port 80
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf  # Mount custom NGINX config
    depends_on:
      - app  # Ensure the app is running before starting NGINX

volumes:
  db_data:  # Volume for persisting database data
```
Step 1: Install Docker and Docker Compose.
```

```

Step 2:   Steps to Create a Node.js Application:

Directory Structure:

- app/: Contains the Node.js application code (e.g., server.js).
- nginx.conf: Custom NGINX configuration file

 ```
.
├── app/
│   ├── package.json
│   ├── server.js
├── docker-compose.yml
├── nginx.conf
```

Step 3: Run docker-compose:

  Navigate to the directory containing the docker-compose.yml file.
  Execute:
  ```
  docker-compose up -d
  ```
Step 4: This command will:

  Build and start the containers.
  Run the services in detached mode (-d flag).

  1. Access the Application:
    Open a browser and navigate to http://localhost. The reverse proxy (NGINX) directs requests to the Node.js app.

  3. Stop the Application:
    Use the following command to stop and remove the containers:
    ```
    docker-compose down
    ```
