
FROM node:25.2-alpine

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app
COPY --chown=node:node . .

USER node

RUN npm ci
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]