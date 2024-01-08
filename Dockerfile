# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=21.5.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
# WORKDIR /app

COPY public /public
COPY src /src
COPY package.json /package.json
RUN npm install


# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm start

