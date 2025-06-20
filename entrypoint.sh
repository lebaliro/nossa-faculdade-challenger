#!/bin/sh

until npx prisma db push; do
  echo "Aguardando o banco de dados ficar pronto..."
  sleep 5
done

npm run db:seed
npm run build
npm start 