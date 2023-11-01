#!/bin/bash

# Exit script if any command fails
set -e

# Navigate to the project's root directory
cd "$(dirname "$0")"

# Install dependencies for the client
echo "Installing client dependencies..."
cd client
yarn install
cd ..

# Install dependencies for the server
echo "Installing server dependencies..."
cd server
yarn install
cd ..

# Start the server in the background
echo "Starting the server..."
cd server
npm start &
cd ..

# Start the client
echo "Starting the client..."
cd client
yarn start
