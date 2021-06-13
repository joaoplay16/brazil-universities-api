FROM node:alpine
LABEL maintainer="joaoplay16"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
VOLUME [ "/usr/src/app" ]
COPY package.json /usr/src/app/
RUN npm install
COPY . .
ENV NODE_ENV=production
EXPOSE ${SERVER_PORT}
CMD [ "npm", "start" ]