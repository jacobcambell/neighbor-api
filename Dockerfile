FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g pm2

COPY . .

EXPOSE 80

CMD ["pm2-runtime", "start", "ecosystem.config.js"]