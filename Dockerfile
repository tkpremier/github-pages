FROM node:15.5.1 as builder

LABEL author="TK Premier"

WORKDIR /var/www

RUN npm install --global pm2


ENV PORT=3000
ENV NGINX_PORT=80

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./ ./

RUN yarn build

EXPOSE 3000

USER node

CMD [ "npm", "run", "start"]