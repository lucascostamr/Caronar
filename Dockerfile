# syntax=docker/dockerfile:1
FROM node:current-alpine3.18
WORKDIR /app
COPY . /app/
# RUN npm run install:clean
EXPOSE 3001 3000
CMD npm run install:clean