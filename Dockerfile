FROM node:16 as builder

RUN mkdir -p /home/tkpremier/client/node_modules && chown -R tkpremier:tkpremier /home/tkpremier/client

# Change working directory
WORKDIR /home/tkpremier/client
# Copy package.json and package-lock.json
COPY package*.json ./

USER tkpremier
# Install npm production packages 
RUN npm install --production
COPY --chown=tkpremier:tkpremier . .
ENV NODE_ENV production
ENV PORT 3000
RUN npm run build

EXPOSE 3000


CMD ["npm", "start"]
