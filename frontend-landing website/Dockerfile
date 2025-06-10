FROM node:23-alpine 

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build && npm install -g serve

EXPOSE 5173

CMD ["npm" , "run", "dev"]