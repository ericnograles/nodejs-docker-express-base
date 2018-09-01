FROM node:carbon-jessie
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3001 5858
CMD [ "$NODE_ENV" = "production" ] && yarn start || yarn debug