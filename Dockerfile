# Используем официальный Node образ
FROM node:22-alpine AS builder

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники
COPY . .

# Сборка NestJS приложения
RUN npm run build

# ----------------- Runtime stage -----------------
FROM node:22-alpine AS runner

WORKDIR /app

# Копируем только нужное для запуска
COPY package*.json ./
RUN npm install --only=production

# Копируем собранный код из builder-слоя
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/views ./views

# Переменные окружения (минимум)
ENV NODE_ENV=production

# Порт, который слушает Nest (по умолчанию 3000)
EXPOSE 3000

# Команда запуска
CMD ["node", "dist/main"]