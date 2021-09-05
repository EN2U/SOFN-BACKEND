FROM node:14.17.5-alpine3.13
WORKDIR /backend
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]

