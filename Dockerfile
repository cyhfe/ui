FROM node:18-alpine as builder

WORKDIR /code

ADD package.json package-lock.json /code/
RUN npm install 

ADD . /code
RUN npm run docs:build

FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/docs-dist /usr/share/nginx/html