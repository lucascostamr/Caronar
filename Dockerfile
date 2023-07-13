FROM node:latest
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
COPY . .
EXPOSE 3000 3001
CMD ["npm", "start"] 

# && cd /server && npm install && npm start