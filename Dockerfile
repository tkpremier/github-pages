FROM node:16 as builder

RUN mkdir -p /home/node/client/node_modules && chown -R node:node /home/node/client

# Change working directory
WORKDIR /home/node/client
# Copy package.json and package-lock.json
COPY package*.json ./

USER node
# Install npm production packages 
# RUN npm install --production
ENV NODE_ENV production
ENV NODE_OPTIONS=--max_old_space_size=2048
RUN npm install
COPY --chown=node:node . .
ENV PORT 3000
RUN npm run build


EXPOSE 3000


CMD ["npm", "run", "start"]
