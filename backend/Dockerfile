FROM node:18-alpine

WORKDIR /backend/

COPY assets/images/ /backend/assets/images
COPY db/ /backend/db
COPY lib/ /backend/lib
COPY routes/ /backend/routes/
COPY app.js /backend/
COPY package.json /backend/
COPY .env /backend/

RUN yarn install

EXPOSE 3000

CMD ["node", "app.js"]