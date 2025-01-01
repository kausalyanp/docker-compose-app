Here’s a sample docker-compose.yml file for a multi-container application setup. This example includes a web application using Node.js, a database using MySQL, and a reverse proxy using NGINX.

## Step 1. Install Docker and Docker Compose:
### 1. Install Docker:
   ```
   #!/bin/bash
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update


    # To install the latest version, run:
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Verify that the Docker Engine installation is successful by running the hello-world image.
    sudo docker run hello-world
   ```
### 2. Install Docker Compose:

Use the following command, it will download the 1.29.2 release and save the executable file at /usr/local/bin/docker-compose, which will make this software globally accessible as docker-compose:
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
Change the version to latest by replacing 1.29.2. Refer to Release page: https://github.com/docker/compose/releases for latest versions.

Next, set the correct permissions so that the docker-compose command is executable:
```
sudo chmod +x /usr/local/bin/docker-compose
```

To verify that the installation was successful, you can run:
```
docker-compose --version
```

## Step 2:   Steps to Create a Node.js Application:

Directory Structure:

- app/: Contains the Node.js application code (e.g., server.js)  and package.json.
- nginx.conf: Custom NGINX configuration file
- docker-compose.yml

 ```
.
├── app/
│   ├── package.json
│   ├── server.js
├── docker-compose.yml
├── nginx.conf
```
## Step 3: Run docker-compose:

1. Navigate to the directory containing the docker-compose.yml file. Execute:
    ```
    docker-compose up -d
    ```
    This command will:
      - Build and start the containers.
      - Run the services in detached mode (-d flag).

2. Access the Application:
    Open a browser and navigate to http://localhost:3000 (as the port declared here is 3000) or  connect to ypur ip addesss http://ip_address:3000 The reverse proxy (NGINX) directs requests to the Node.js app.
  
3. Stop the Application:
    Use the following command to stop and remove the containers:
    ```
    docker-compose down
    ```

### Note:
1. Rebuild the docker compose, you can use the command:
   ```
   docker-compose up -d --build
   ```
2. To check the logs of docker-compose use:
   ```
   docker-compose logs
   ```
3. To check the volume of docker use:
   ```
   docker volume ls # lists the volume
   docker volume rm <name> # removes the volume <name>
   ```
4. To remove all the images use:
   ```
   docker rmi <image_id>
   ```
>> Created By Kausalya N P
