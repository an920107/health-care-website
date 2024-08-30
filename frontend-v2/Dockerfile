FROM node:20-alpine3.20

WORKDIR /app
COPY . .

RUN yarn install && yarn cache clean && yarn run build

EXPOSE 3000
CMD ["yarn", "run", "start"]
