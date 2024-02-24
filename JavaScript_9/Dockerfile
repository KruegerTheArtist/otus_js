# FROM - специальная команда указывает на базе какого образа создавать наш образ
# :<version> указание версии
FROM node:20-alpine as node

FROM node as sdk-build

# В какую папку развернется
WORKDIR /usr/src/app
# Копирование зависимостей для запуска внутрь образа
COPY package*.json ./
# Внутри образа запускаем команду установки зависимостей
RUN npm install
RUN npm ci

# Собираем ПО
COPY tsconfig.json ./
COPY src ./src
COPY .env ./
RUN npm run build

# Команда которая будет выполнена в консоли
CMD [ "node", "./build/main.js" ]