FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD export environment=${ENVIRONMENT} && npm run ${BRANCH}