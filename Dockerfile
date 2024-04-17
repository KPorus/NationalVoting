FROM node:latest
WORKDIR /src
ADD . .
RUN npm install
CMD npm start