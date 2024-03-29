# Используйте базовый образ с Node.js
FROM node

# Установите рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./


# Установка зависимостей
RUN npm install

# Копируем все файлы из текущей директории в рабочую директорию контейнера
COPY . .
EXPOSE 8000
# Команда для сборки проекта Vue.js
RUN npm run build

# Команда для запуска приложения (здесь можно использовать любой веб-сервер, например, serve)
CMD ["npm", "run", "serve"]

