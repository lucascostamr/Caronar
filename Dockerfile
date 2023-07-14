FROM node:current-alpine3.18
WORKDIR /app
COPY . .
RUN npm install --no-optional && cd ./server/ && npm install && npm cache clean --force && apk add git
EXPOSE 3000 3001
CMD ["npm", "start"]