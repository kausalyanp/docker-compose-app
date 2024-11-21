FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Change permissions to ensure proper access
RUN chmod -R 755 /usr/src/app

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
