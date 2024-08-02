FROM node:latest

ADD src src
ADD index.js .
ADD package.json .
ADD tsconfig.json .
ADD .env .

EXPOSE 8888
CMD ["sh", "-c", "npm install && npm run start"]
