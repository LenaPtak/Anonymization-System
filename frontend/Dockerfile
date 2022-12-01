FROM node:latest

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ENV NODE_ENV development

COPY package.json package-lock.json ./

COPY ./src ./src

COPY ./public ./public

RUN npm install

RUN npm run build

CMD ["npm", "start", "--host", "0.0.0.0", "disableHostCheck", "true"]
