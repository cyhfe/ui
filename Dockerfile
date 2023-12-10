# https://github.com/docker/awesome-compose/blob/master/react-nginx/Dockerfile
# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts AS development

# Set working directory
WORKDIR /app

# 
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Same as npm install
RUN npm i

COPY . /app

FROM development AS build

RUN npm run docs:build


# 2. For Nginx setup
FROM nginx:alpine

# Copy config nginx
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/docs-dist .