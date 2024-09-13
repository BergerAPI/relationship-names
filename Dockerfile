FROM node:22-alpine

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

COPY src ./src
COPY views ./views

RUN npm install

EXPOSE 3000

CMD ["npm","run","start"]