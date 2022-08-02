FROM node:16

# Change working directory
WORKDIR "/opt/app-root/src"
# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm production packages 
RUN npm install --production
COPY . .
RUN npm run build

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
