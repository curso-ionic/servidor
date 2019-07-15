FROM node:8-alpine
WORKDIR /usr/src/app

COPY app.js /usr/src/app/
COPY passport.js /usr/src/app/
COPY package.json /usr/src/app/
RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]