FROM node:current-alpine3.18
WORKDIR /app
COPY . .
RUN \
npm install --no-optional &&\
npm run build &&\
cd ./server/ &&\
npm install &&\
npm cache clean --force &&\
apk add git &&\
apk openssh

EXPOSE 3000 3001
CMD \
    git init&&\
    git branch -m&&\
    npm start