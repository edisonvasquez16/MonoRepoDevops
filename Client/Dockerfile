FROM node:lts-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4040

CMD ["npm", "run", "${branch}"]