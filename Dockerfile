FROM node:22.12.0
WORKDIR /app
COPY package*.json ./
COPY .env .env
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]