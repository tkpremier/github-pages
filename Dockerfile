FROM node

LABEL author="TK Premier"

ENV NODE_ENV=development
ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

RUN npm run build

EXPOSE $PORT

ENTRYPOINT [ "npm", "run", "start" ]