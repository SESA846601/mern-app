# FROM node:18
FROM node:18-alpine
WORKDIR /app
# COPY package.json .
COPY package*.json ./
# RUN npm install
RUN npm install --production
COPY . .
EXPOSE 5000
# CMD ["npm", "start"]
CMD ["node", "index.js"]
