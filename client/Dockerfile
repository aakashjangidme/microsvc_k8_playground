FROM node:14-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

# Caching specific
# ADD . /app 

EXPOSE 3000

CMD [ "yarn", "start" ]

