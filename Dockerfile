FROM node:latest
WORKDIR /usr/src/app
RUN npm install -g nodemon@1.11.0
COPY package*.json ./
RUN npm install && npm ls
COPY . .
CMD [ "npm", "start" ]