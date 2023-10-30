#!/bin/bash

# Change ownership permissions of all files and directories to 777
sudo chmod -R 777 .

# Install dependencies for the client
cd client
sudo yarn add react-scripts

# Install dependencies for the server
cd ../server
npm install express
npm install

# Start the server in the background
npm start &

# Change back to the client directory and start the client
cd ../client
yarn start
