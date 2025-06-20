FROM node:20-alpine

WORKDIR /app

COPY app/package.json app/package-lock.json ./

RUN npm install

COPY app/ .

RUN npx prisma generate

RUN npm run db:seed

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 