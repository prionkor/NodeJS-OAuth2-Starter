FROM node:14.17-alpine
WORKDIR /app
RUN yarn global add sequelize-cli

COPY ./package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["yarn", "run", "start"]
