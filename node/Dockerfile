FROM node:6.10-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g mocha

ADD ./package.json package.json

RUN npm install

ADD ./src/ src/
ADD ./test/ test/

CMD tail -f /dev/null
