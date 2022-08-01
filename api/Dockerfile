# build: 
#>sudo docker build --tag megasortudoapi:1.0 https://github.com/gutoconde/megasortudolite.git#main:api 
# execucao:
#>sudo docker run -d --restart=always -p 3000:3000 --name megasortudoapi megasortudoapi:1.0

#build stage
#FROM node:14.16.0 as build-stage
FROM node:14-alpine as build-stage
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "./index.js" ]