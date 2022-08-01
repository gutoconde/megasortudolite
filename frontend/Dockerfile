# build: 
#>sudo docker build --tag megasortudo:1.0 https://github.com/gutoconde/megasortudolite.git#main:frontend
# execucao:
#>sudo docker run -d --restart=always -p 8081:80 --name megasortudo megasortudo:1.0

#build stage
FROM node:14-alpine as build-stage
RUN apk update
RUN apk upgrade
RUN apk add git
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#production
FROM nginx:stable-alpine as production-stage
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /frontend/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]