#!/bin/bash
# Create the directory here so that it uses your account's user ID and group ID
# instead of the container's root user
# This is necessary to avoid permission issues when writing files to the host
# system.

PLOTS_DIR=$(pwd)/public/plots
mkdir -p $PLOTS_DIR

# Build the Docker image from the Dockerfile in the current directory
docker build -t plot-gallery .
# Run the Docker container with the specified options
# -p 3000:3000 maps port 3000 in the container to port 3000 on the host
# -v $(pwd):/app/public/plots mounts the current directory to /app/public/plots in the container
# -u $(id -u):$(id -g) runs the container with the current user's UID and GID
# --rm automatically removes the container when it exits
# --name plot-gallery gives the container a name for easier management
docker run --rm --name plot-gallery \   
  -p 3000:3000 \
  -v $PLOTS_DIR:/app/public/plots \
  -u $(id -u):$(id -g) \
  plot-gallery