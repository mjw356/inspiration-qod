FROM node:18-alpine

WORKDIR /frontend/

COPY public/ /frontend/public
COPY src/ /frontend/src
COPY package.json /frontend/

RUN yarn install
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "serve", "-s", "build"]